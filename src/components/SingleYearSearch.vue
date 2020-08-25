<template>
    <div class="container is-fluid">
    
        <section class="box">
            <h1 class="title">Seleziona un anno accademico  </h1>

            <div class="select">
                <select v-on:change="getStudentsTotalNumber()" v-model="selectedYear" placeholder="Seleziona un anno accademico" rounded>
                    <option v-for="year in years" :value="year" v-bind:key="year">{{year}}</option>
                </select>
            </div>
        </section>

        <section class="box">
            <h1 class="subtitle">Totale iscritti: <span class="title"> {{totalNumber}} </span>  </h1>

            <div class="columns">
                <div class="column">
                    <ul>
                        <li v-for="(value, key) in regionList" v-bind:key="value">  {{key}} : <strong> {{value}} </strong> </li>
                    </ul>
                </div>

                <div class="column">
                    Flusso degli studenti
                    <ChordDiagram :chart-data="CHORD_DATA" :chart-config="CHORD_CONFIG" />
                </div>

                <div class="column">
                    Corso di studi
                    <BarChart :chart-data="BARCHART_DATA" :chart-config="BARCHART_OPTIONS" />
                </div>
            </div>
        </section>
    
        <section class="box">
            <h1 class="title"> Studenti uscenti dalla regione </h1> 
            <div class="columns">
                <div class="column ">
                    <ChoroplethMap :map-data="REGIONS_MOCK_DATA" :map-config="MAP_CONFIG" />
                </div>
    
                <div class="column">

                    <b-field  label="Top 3 regioni con magggior numero studenti uscenti  ">
                        <div class="field">
                            <b-switch size="is-medium" type="is-danger"> Maggior numero </b-switch>
                        </div>
                    </b-field>

                    <SortedBarChart :chart-data="SORTED_BARCHART_DATA" :chart-config="SORTED_BARCHART_CONFIG" :chart-id="SORTED_BARCHART_GLOBAL_OUTGOING_ID"/>
                </div>
            </div>
        </section>

        <section class="box">
            <h1 class="title"> Studenti entranti nella regione </h1> 
            <div class="columns">
                <div class="column">
                    <ChoroplethMap :map-data="REGIONS_MOCK_DATA" :map-config="MAP_CONFIG2" />
                </div>
    
                <div class="column">
                    <b-field  label="Top 3 regioni con magggior numero studenti entranti  ">
                        <div class="field">
                            <b-switch size="is-medium" type="is-success"> Maggior numero </b-switch>
                        </div>
                    </b-field>

                    <SortedBarChart :chart-data="SORTED_BARCHART_DATA" :chart-config="SORTED_BARCHART_CONFIG" :chart-id="SORTED_BARCHART_GLOBAL_INCOMING_ID"/>
                </div>
            </div>
        </section>

        
    
        <!-- <button v-on:click="changeData">Change it</button> -->
            
    </div> 
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
    name: 'SingleYearSearch',
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
            regionList: {
                'Basilicata': 10,
                'Puglia': 30,
                'Calabrfia': 50,
                'Basiligcata': 11,
                'Puglsia': 31,
                'Calvabria': 51,
                'Basailicata': 12,
                'Puggglia': 32,
                'Calaaabria': 52,
                'Basssilicata': 13,
                'Pugddlia': 33,
                'Calfabria': 53,
                'Batsilicata': 14,
                'Pugrlia': 34,
                'Caylabria': 54,
                'Basgilicata': 15,
                'Puhglia': 35,
                'Calfssabria': 55,
                'Puglaaia': 36,
                'Calassbria': 56,
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
.round-container {
    border: 1px solid lightgrey;
    border-radius: 25px;
    padding: 5px;
    margin: 10px 0px
}

</style>
