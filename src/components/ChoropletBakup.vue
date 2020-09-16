<template>
  <div class="my-map-container" :id="chartId">
    <l-map 
    :center="center" 
    :zoom="zoom" 
    style="height: 100%">

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
    
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        />
      
        <l-choropleth-layer 
          :data="mapData" 
          titleKey="department_name" 
          idKey="department_id" 
          :value="mapConfig.value" 
          @click="clearSelection"
          geojsonIdKey="reg_istat_code" 
          :geojson="italyGeojson"
          :colorScale="mapConfig.colorScale"
          currentStrokeColor='636363'>

            <template slot-scope="props" class="info">
                <l-reference-chart 
                    :title="mapConfig.legendTitle"
                    :colorScale="mapConfig.colorScale" 
                    :min="props.min" 
                    :max="props.max" 
                    position="bottomleft"/>
            </template>
        </l-choropleth-layer>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
import { ReferenceChart, ChoroplethLayer } from 'vue-choropleth'

import italyGeojson from '../data/italy_regions.json'

export default {
  name: 'ChoroplethMapComponent',
  props: {
    mapData: {
      type: Array,
      default: () => ([])
    },
    mapConfig: {
      type: Object,
      default: () => ({})
    },
    chartId: {
        type: String
    }
  },
  data() {
    return {
      zoom: 5,
      center: latLng(41.893121, 12.461145),
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      italyGeojson,
      isBodyOpen: true
    };
  },
  components: { 
    LMap,
    LTileLayer,
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 
  },
  methods: {
        
        clearSelection() {
            console.log('clicked')
        }
    }
}
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
