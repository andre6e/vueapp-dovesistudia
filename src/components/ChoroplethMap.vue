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
        :data="mapData" 
        titleKey="department_name" 
        idKey="department_id" 
        :value="mapConfig.value" 
        geojsonIdKey="reg_istat_code" 
        :geojson="italyGeojson"
        :colorScale="mapConfig.colorScale"
        currentStrokeColor='636363'>

          <template slot-scope="props" >
            <l-info-control
              :item="props.currentItem" 
              :unit="props.unit" 
              title="Num. studenti"
              placeholder="Posizionarsi su una regione"/>
            
            <l-reference-chart 
              :title="mapConfig.legendTitle"
              :colorScale="mapConfig.colorScale" 
              :min="props.min" 
              :max="props.max" 
              position="topright"/>
          </template>
      </l-choropleth-layer>
 
  </l-map>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

import italyGeojson from '../data/italy_regions.json'

export default {
  name: 'ChoroplethMap',
  props: {
    mapData: {
      type: Array,
      default: () => ([])
    },
    mapConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      zoom: 5,
      center: latLng(41.893121, 12.461145),
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      italyGeojson
    };
  },
  components: { 
    LMap,
    LTileLayer,
    'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
