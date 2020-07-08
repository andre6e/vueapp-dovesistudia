<template>
    <section class="section is-small">
        <div class="container">
            <h1 class="title">Statistiche su singolo anno accademico</h1>
    
            <p class="heading">Seleziona un anno accademico</p>
            <div class="select">
                <select v-on:change="getStudentsTotalNumber()" v-model="selectedYear" placeholder="Seleziona un anno accademico" rounded>
                        <option v-for="year in years" :value="year" v-bind:key="year">{{year}}</option>
                    </select>
            </div>
    
            <nav class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Totale iscritti</p>
                        <p class="title">{{totalNumber}}</p>
                    </div>
                </div>
            </nav>
        </div>
    
        <section>
            <div class="columns">
                <div class="column is-half">
                    Outgoing students
                    <ChoroplethMap :map-data="REGIONS_MOCK_DATA" :map-config="MAP_CONFIG" />

                    Top 3 regioni outgoing
                    <SortedBarChart :chart-data="SORTED_BARCHART_DATA" :chart-config="SORTED_BARCHART_CONFIG" :chart-id="SORTED_BARCHART_GLOBAL_OUTGOING_ID"/>
                </div>
    
                <div class="column is-half">
                    Incoming students
                    <ChoroplethMap :map-data="REGIONS_MOCK_DATA" :map-config="MAP_CONFIG2" />

                    Top 3 regioni incoming
                    <SortedBarChart :chart-data="SORTED_BARCHART_DATA" :chart-config="SORTED_BARCHART_CONFIG" :chart-id="SORTED_BARCHART_GLOBAL_INCOMING_ID"/>
                </div>
            </div>
        </section>
    
        <button v-on:click="changeData">Change it</button>
    
        <div class="columns">
            <div class="column is-half">
                Flusso studenti
                <ChordDiagram :chart-data="CHORD_DATA" :chart-config="CHORD_CONFIG" />
            </div>
    
            <div class="column is-half">
                Tipologia corso di studi
                <BarChart :chart-data="BARCHART_DATA" :chart-config="BARCHART_OPTIONS" />
            </div>
        </div>
    
    
    
    
    
    
    
    
    </section>
</template>

<script>
import ChoroplethMap from './ChoroplethMap.vue'
import ChordDiagram from './ChordDiagram.vue'
import BarChart from './BarChart.vue'
import SortedBarChart from './SortedBarChart.vue'

import { REGIONS_MOCK_DATA, MAP_CONFIG, MAP_CONFIG2 } from '../data/regions_map_mock'
import { CHORD_DATA, CHORD_DATA2, CHORD_CONFIG } from '../data/chord_diagram_mock'
import { BARCHART_DATA, BARCHART_DATA2, BARCHART_OPTIONS } from '../data/barchart_mock'
import { SORTED_BARCHART_DATA, SORTED_BARCHART_DATA2, SORTED_BARCHART_CONFIG } from '../data/sortedbarchart_mock'

import { SORTED_BARCHART_GLOBAL_OUTGOING_ID, SORTED_BARCHART_GLOBAL_INCOMING_ID } from '../constants/constants'

export default {
    name: 'GlobalView',
    props: {
        msg: String
    },
    components: {
        ChoroplethMap,
        ChordDiagram,
        BarChart,
        SortedBarChart
    },
    data: function() {
        return {
            years: ["2010/11", "2011/12", "2012/13", "2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
            selectedYear: "2018/19",
            totalNumber: 100,
            totalStudentsNumber: {
                "2010/11": 100,
                "2011/12": 200,
                "2012/13": 300,
                "2013/14": 400,
                "2014/15": 500,
                "2015/16": 600,
                "2016/17": 700,
                "2017/18": 800,
                "2018/19": 900,
            },
            REGIONS_MOCK_DATA,
            MAP_CONFIG,
            MAP_CONFIG2,
            CHORD_DATA,
            CHORD_DATA2,
            CHORD_CONFIG,
            BARCHART_DATA,
            BARCHART_OPTIONS,
            BARCHART_DATA2,
            SORTED_BARCHART_GLOBAL_OUTGOING_ID,
            SORTED_BARCHART_GLOBAL_INCOMING_ID,
            SORTED_BARCHART_DATA,
            SORTED_BARCHART_CONFIG,
            SORTED_BARCHART_DATA2
        }
    },
    methods: {
        getStudentsTotalNumber() {
            this.totalNumber = this.totalStudentsNumber[this.selectedYear]
        },
        changeData() {
            this.CHORD_DATA = this.CHORD_DATA2
            this.BARCHART_DATA = this.BARCHART_DATA2
            this.SORTED_BARCHART_DATA = this.SORTED_BARCHART_DATA2
        }

    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
