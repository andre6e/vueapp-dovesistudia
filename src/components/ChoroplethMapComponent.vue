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

      <div class="my-info-container">
        <span> Studenti {{mapData.tooltip_text}} </span>
        
        <div class="gradient">
          <span v-for="step in gradientSteps" :key="''+ step + chartId" class="grad-step" :style="{'background-color': step}"> </span>
        </div>

        <div class="domain-values">
          <span class="domain-min"> {{mapDataCopy.min}} </span>
          <span class="domain-med"> {{ MEDIAN_VALUE }} </span>
          <span class="domain-max"> {{mapDataCopy.max}} </span>
        </div>
      </div>

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
    chartId: {
      type: String,
    }
  },
  data() {
    // initializing working data and map colors
    this.saveMapDataWorkingCopy();
    this.activateAllRegions();
    this.updateMinAndMaxValue();

    return {
      zoom: 5,
      center: latLng(41.893121, 12.461145),
      // url: "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      enableTooltip: true,
      italyGeojson,
      GEOJSON,
      geoJsonOptions: this.getGeoJsonOptions(),
      firstFocus: false,
      gradientSteps: [],
      MEDIAN_VALUE: null
    };
  },
  mounted() {
    this.updateGradientColor();
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

          layer.bindTooltip(
            that.returnTooltipText(feature.properties.reg_name),
            { permanent: false, sticky: true }
          );

          layer.on({
            click: that.onFeatureClick,
          });
        },
        style: function(feature) {
          return that.getActiveColorByRegName(feature.properties.reg_name);
        },
      };
    },
    returnTooltipText(region_name) {
      var reg = this.mapDataCopy.data[region_name.toUpperCase()];
      var html = 
          "<div> " +
            "<strong> Regione: </strong>" + region_name + 
          "</div>" +
          "<div> "+
            "<strong> Studenti " + this.mapData.tooltip_text + ": </strong> " + reg.amount + 
          "</div>";
      
      return html;
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

      // mi serve solo come backup
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
      this.updateAllRegionsColor();
      this.updateGradientColor();

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
    updateGradientColor() {
      var linear = d3
          .scaleLinear()
          .domain([this.mapDataCopy.min, this.mapDataCopy.max])
          .range([this.mapData.min_color, this.mapData.max_color]);

      this.gradientSteps = []
      var amounts = []

      for (let i=0; i<this.activatedRegions.length; i++) {
        amounts.push(this.mapDataCopy.data[this.activatedRegions[i]].amount)
      }

      amounts = amounts.sort(function (a, b) {
        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
      });

      this.MEDIAN_VALUE = Math.round(this.getMedianValue(amounts));
      
      for (let i=0; i<amounts.length; i++) {
        var color = linear(amounts[i]);

        if (this.gradientSteps.indexOf(color) == -1) {
          this.gradientSteps.push(color)
        }
      }
    },
    getCurrentActivatedRegion() {
      return this.activatedRegions;
    },
    setRegionsAsActive(activedRegionList) {
      this.activatedRegions = activedRegionList == null ? this.allRegionsBackup: activedRegionList;
      this.firstFocus = false;
      this.updateWorkingDataStatus();
      this.updateMinAndMaxValue();
      this.updateAllRegionsColor();
      this.updateGradientColor();
    },
    // HELPERS
    getMedianValue(arr) {
      const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
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
  /* top: 0; */ 
  /* right: 0; */
  min-width: 200px;
  max-width: 200px;
  margin-top: 10px;
  /* margin-right: 10px; */
  bottom: 0;
  margin-bottom: 10px;
  margin-left: 10px;
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

.gradient {
  width: 95%;
  margin: 0 auto;
  white-space: nowrap;
  position: relative;
  top: 6px;
  padding-bottom: 15px;
  display: flex;
}

.grad-step {
  height: 20px;
  flex: 1;
}

.domain-max {
  position: absolute;
  right: 0;
  bottom: 3px;
}

.domain-med {
  position: absolute;
  right: 25%;
  left: 25%;
  text-align: center;
  bottom: 3px;
}

.domain-min {
  position: absolute;
  left: 0;
  bottom: 3px;
}

.domain-values {
  width: 95%;
  margin: 10 auto;
  white-space: nowrap;
  position: relative;
  top: 6px;
  padding-bottom: 15px;
}
</style>
