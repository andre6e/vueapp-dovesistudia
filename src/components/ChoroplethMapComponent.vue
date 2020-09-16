<template>
  <div class="my-map-container" :id="chartId">
    <l-map :center="center" :zoom="zoom" style="height: 100%">
      <!--
    <div class="my-info-container">
      <div class="info">
        <div v-bind:class="{ 'minimize-icon-position': isBodyOpen }" v-on:click="isBodyOpen = !isBodyOpen">
          <b-icon
              :icon="(isBodyOpen) ? 'window-minimize' : 'plus-thick'"
              size="is-small">
          </b-icon>
        </div>
        
        <b v-show="isBodyOpen">TITLE GOES HERE</b>
        
        <div class="my-info-body" v-show="isBodyOpen">
          <ul>
              <li v-for="(value) in mapData" v-bind:key="value.department_name">   {{value.department_name}} : <strong> {{value.amount_student}} </strong> </li>
          </ul>
        </div>
      </div>
    </div>
    

    -->

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
        return {
          fillColor: that.getColor(feature.properties.reg_name),
          weight: 1,
          opacity: 1,
          color: "white",
          // dashArray: "5",
          fillOpacity: 0.5,
        };
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

      for (const region in this.mapDataCopy.data) {
        this.mapDataCopy.data[region].active = true;
      }

      this.updateMinAndMax()
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

      // e.target.setStyle({
      //   fillColor: this.getColor(clicked_reg)
      // });

      var styles = this.getColor(clicked_reg);

      e.target.setStyle(styles);
    },
    getColor(region_name) {
      // console.log('getcolor')
      // let region_name = d.toUpperCase();

      var region_data = this.mapDataCopy.data[region_name.toUpperCase()];

      if (region_data.active) {
        // devo disattiivare
        return {
          fillColor: "#000000",
          fillOpacity: 1,
          opacity: 1
        }
      } else {
        var linear = d3
          .scaleLinear()
          .domain([this.mapDataCopy.min, this.mapDataCopy.max])
          .range([this.mapData.min_color, this.mapData.max_color]);


        return {
          fillColor: linear(region_data.amount)
        }
      }
    },
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
