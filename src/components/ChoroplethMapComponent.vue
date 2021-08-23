<template>
  <div class="my-map-container" :id="chartId">
    <l-map :center="center" :zoom="zoom" style="height: 100%" ref="map">

      <l-tile-layer :url="url" :attribution="attribution" />

      <l-geo-json
        v-for="geoJson in italyGeojson"
        :key="geoJson.id"
        :geojson="GEOJSON"
        :options="geoJsonOptions"
      ></l-geo-json>

      <!--
      <div class="my-info-container">
        <ul>
          <li v-for="region in activatedRegions" :key="region">
            {{region}} : {{mapDataCopy.data[region].amount}}
          </li>
        </ul>
      </div>
      -->

    </l-map>
  

  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import * as d3 from "d3";

import italyGeojson from "../data/italy_regions.json";
import { GEOJSON } from "../data/italy_regions.js";

export default {
  name: "ChoroplethMapComponent",
  props: {
    mapData: {
      type: Object,
      default: () => ({}),
    },
    mapConfig: {
      type: Object,
      default: () => ({}),
    },
    chartId: {
      type: String,
    },
  },
  data() {
    // initializing working data and map colors
    this.saveMapDataWorkingCopy();
    this.activateAllRegions();
    this.updateMinAndMaxValue();

    return {
      zoom: 5,
      center: latLng(41.893121, 12.461145),
      url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      italyGeojson,
      GEOJSON,
      geoJsonOptions: this.getGeoJsonOptions(),
      firstFocus: false
    };
  },
  methods: {
    getGeoJsonOptions() {
      var that = this;

      return {
        onEachFeature: function(feature, layer) {
          layer.getLatLng = function() {
            return this.getBounds().getCenter();
          };
          layer.setLatLng = function() {};
          layer._latlng = layer.getLatLng();

          layer.on({
            click: that.onFeatureClick,
          });
        },
        style: function(feature) {
          return that.getActiveColorByRegName(feature.properties.reg_name);
        },
      };
    },
    saveMapDataWorkingCopy() {
      this.mapDataCopy = this.mapData;
    },
    activateAllRegions() {
      this.activatedRegions = [];

      for (const region in this.mapDataCopy.data) {
        this.mapDataCopy.data[region].active = true;
        this.activatedRegions.push(region);
      }

      this.allRegionsBackup = this.activatedRegions;
    },
    updateWorkingDataStatus() {
      for (const region in this.mapDataCopy.data) {
        this.mapDataCopy.data[region].active = this.activatedRegions.includes(region) ? true : false
      }
    },
    updateMinAndMaxValue () {
      var max = 0;
      var min = null;

      for (const region in this.mapDataCopy.data) {
        var reg_amount = this.mapDataCopy.data[region].amount;

        if (this.mapDataCopy.data[region].active) {
          if (reg_amount > max) {
            max = reg_amount
          }

          if (min === null || reg_amount < min) {
            min = reg_amount
          }
        }
      }

      this.mapDataCopy.max = max;
      this.mapDataCopy.min = min;
    },
    onFeatureClick(e) {
      let clicked_reg = e.target.feature.properties.reg_name.toUpperCase();

      if (this.firstFocus == false) {
        this.firstFocus = true;
        this.activatedRegions = [clicked_reg];
      } else {
        let index = this.activatedRegions.indexOf(clicked_reg);
        
        if (index != -1) {
          this.activatedRegions.splice(index, 1);

          if (this.activatedRegions.length == 0) {
            // se rimuovo l'ultima le resetto tutte di default
            this.activatedRegions = this.allRegionsBackup;
            this.firstFocus = false;
          }
        } else {
          this.activatedRegions.push(clicked_reg);
        }
      }

      this.updateWorkingDataStatus();
      this.updateMinAndMaxValue();
      this.updateAllRegionsColor(clicked_reg);

      // emit for parent component
      this.$emit('region-click', {
        activatedRegions: this.activatedRegions, 
        chartId: this.chartId
      });
    },
    updateRegionColorByRegName(region_name) {
      var region_data = this.mapDataCopy.data[region_name.toUpperCase()];
      return region_data.active ? this.getActiveColorByRegName(region_name) : this.getNonActiveColor()
    },
    getActiveColorByRegName(region_name) {
      var region_data = this.mapDataCopy.data[region_name.toUpperCase()];

      var linear = d3
          .scaleLinear()
          .domain([this.mapDataCopy.min, this.mapDataCopy.max])
          .range([this.mapData.min_color, this.mapData.max_color]);

        return {
          fillColor: linear(region_data.amount),
          weight: 2,
          opacity: 1,
          color: 'rgb(150,150,150)',
          fillOpacity: 0.7,
          bubblingMouseEvents: false
        }
    },
    getNonActiveColor() {
      return {
        stroke: true,
        color: 'rgb(150,150,150)',
        dashArray: null,
        opacity: 1,
        fillOpacity: 1,
        fillColor: 'rgba(0,0,0,0)'
      }
    },
    updateAllRegionsColor() {
      var layers = this.$refs.map.mapObject._layers

      for (var el in layers) {
        var feature = layers[el].feature

        if (feature && feature.properties) {
          var reg_name = feature.properties.reg_name
          layers[el].setStyle(this.updateRegionColorByRegName(reg_name))
        }
      }
    },
    getCurrentActivatedRegion() {
      return this.activatedRegions;
    }
  },
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-info-container {
  position: absolute;
  z-index: 1000;
  /* pointer-events: none; */
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
  background-color: white;
  padding: 6px 8px;
  box-shadow: 0 0 15px rgb(0 0 0 / 20%);
  border-radius: 5px;
}

.my-map-container {
  height: 500px;
  width: 100%;
}

.minimize-icon-position {
  position: absolute;
  right: 0;
  margin-right: 5px;
}
</style>
