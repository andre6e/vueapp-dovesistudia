<template>

  <l-map 
  :center="center" 
  :zoom="zoom" 
  style="height: 500px;">
   
   <l-tile-layer
    :url="url"
    :attribution="attribution"
    />

    <l-choropleth-layer 
      :data="pyDepartmentsData" 
      titleKey="department_name" 
      idKey="department_id" 
      :value="value" 
      :extraValues="extraValues" 
      geojsonIdKey="dpto" 
      :geojson="paraguayGeojson" 
      :colorScale="colorScale">
        <template slot-scope="props">
          <l-info-control 
            :item="props.currentItem" 
            :unit="props.unit" 
            title="Department" 
            placeholder="Hover over a department"/>
          <l-reference-chart 
            title="Girls school enrolment" 
            :colorScale="colorScale" 
            :min="props.min" 
            :max="props.max" 
            position="topright"/>
        </template>
    </l-choropleth-layer>

</l-map>
</template>

<script>
import { latLng } from "leaflet";
// import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";

import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

// import { geojson } from '../data/py-departments-geojson'
import paraguayGeojson from '../data/paraguay.json'
import { pyDepartmentsData } from '../data/py-departments-data'

export default {
  name: 'MapComponent',
  props: {
    msg: String
  },
  data() {
    return {
      zoom: 5,
      center: latLng(41.893121, 12.461145),
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      
      //   CHROPLET

      pyDepartmentsData,
      paraguayGeojson,
      colorScale: ["e7d090", "e9ae7b", "de7062"],
      value: {
        key: "amount_w",
        metric: "% girls"
      },
      extraValues: [{
        key: "amount_m",
        metric: "% boys"
      }],
      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: '3d3213'
    
    };
  },
  components: { 
    LMap,
    LTileLayer,
    'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 
    // LMarker,
    // LPopup,
    // LTooltip
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
