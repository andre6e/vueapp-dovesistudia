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
    let that = this;

    this.saveMapDataWorkingCopy();
    this.activateAllRegions();
    this.updateMinAndMax();
    
    let geoJsonOptions = {
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


    return {
      zoom: 5,
      center: latLng(41.893121, 12.461145),
      url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      italyGeojson,
      GEOJSON,
      isBodyOpen: true,
      geoJsonOptions: geoJsonOptions,
    };
  },
  methods: {
    saveMapDataWorkingCopy() {
      this.mapDataCopy = this.mapData;
    },
    activateAllRegions() {
       for (const region in this.mapDataCopy.data) {
        this.mapDataCopy.data[region].active = true;
      }
    },
    updateMinAndMax () {
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

      console.log('min and max have been updated to', max, min)
    },
    updateRegionActiveState (region_name) {
      for (const region in this.mapDataCopy.data) {
        if (region === region_name) {
          this.mapDataCopy.data[region].active = !this.mapDataCopy.data[region].active
          break;
        }
      }
    },
    onFeatureClick(e) {
      var clicked_reg = e.target.feature.properties.reg_name.toUpperCase();

      this.updateRegionActiveState(clicked_reg)
      this.updateMinAndMax()

      // updating the clicked region color
      e.target.setStyle(this.updateRegionColorByRegName(clicked_reg));

      // updating the remaning regions color
      this.updateRemainingRegion(clicked_reg);
    },
    updateRegionColorByRegName(region_name) {
      var region_data = this.mapDataCopy.data[region_name.toUpperCase()];
      return region_data.active ? this.getActiveColorByRegName(region_name) : this.deactivateRegionColor()
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
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
          bubblingMouseEvents: false
        }
    },
    deactivateRegionColor() {
      return {
        weight: 2,
        opacity: 1,
        color: 'red',
        dashArray: '5',
        fillOpacity: 1,
        fillColor: '#000000'
      }
    },
    updateRemainingRegion(clicked_reg) {
      var layers = this.$refs.map.mapObject._layers
      var changed = [] // mi serve un riferimento altrimenti ciclerebbe piu volte sulla stessa feature

      for (var el in layers) {
        var feature = layers[el].feature

        if (feature && feature.properties) {
          var reg_name = feature.properties.reg_name

          if (!changed.includes(reg_name) && reg_name.toUpperCase() !== clicked_reg.toUpperCase()) {
            changed.push(reg_name)
            layers[el].setStyle(this.updateRegionColorByRegName(reg_name))
          } 
        }
      }
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
