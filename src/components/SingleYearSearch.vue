<template>
    <div class="container is-fluid">
    
        <section class="box">
            <h1 class="title"> Statisiche su singolo anno accademico  </h1>
            <h2 class="subtitle"> Seleziona un anno accademico </h2>

            <div class="select">
                <select v-on:change="getStudentsTotalNumber()" v-model="selectedYear" placeholder="Seleziona un anno accademico" rounded>
                    <option v-for="year in years" :value="year" v-bind:key="year">{{year}}</option>
                </select>
            </div>
        </section>

        <section class="box">
            <h1 class="title">Totale iscritti: {{totalNumber}} </h1>

            <div class="columns">
                <div class="column">
                    <h2 class="subtitle"> Provenienza iscritti </h2>
                    <ul>
                        <li v-for="(value, key) in regionList" v-bind:key="value">  {{key}} : <strong> {{value}} </strong> </li>
                    </ul>
                </div>

                <div class="column">
                    <h2 class="subtitle"> Flusso degli studenti </h2>
                    <ChordDiagramComponent :chart-data="CHORD_DATA" :chart-config="CHORD_CONFIG" />
                </div>

                <div class="column">
                    <h2 class="subtitle"> Corso di studi </h2>
                    <BarChartComponent :chart-data="BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="MAIN_BAR_CHART_FIELD_OF_STUDY"/>
                </div>
            </div>
        </section>
    
        <section class="box">
            <h1 class="title"> Studenti uscenti ed entranti per regione </h1> 
            <div class="columns">
    
                <div class="column">
                    <h2 class="subtitle"> Studenti che vanno via dalle regioni </h2>
                    <ChoroplethMapComponent :map-data="REGIONS_MOCK_DATA" :map-config="MAP_CONFIG" :chart-id="MAP_OUTGOING_ID"/>
                </div>

                <div class="column">
                    <h2 class="subtitle"> Studenti che arrivano nelle regioni </h2>
                    <ChoroplethMapComponent :map-data="REGIONS_MOCK_DATA" :map-config="MAP_CONFIG2" :chart-id="MAP_INCOMING_ID"/>
                </div>
            </div>
        </section>


        <!-- FOCUS REGIONI -->

        <section class="box">
            <h1 class="title">Seleziona una singola regione</h1>
            <h2 class="subtitle"> Per informazioni piu dettagliate a riguardo </h2>

            <div class="select">
                <select v-on:change="getStudentsTotalNumber()" v-model="selectedYear" placeholder="Seleziona un anno accademico" rounded>
                    <option v-for="year in years" :value="year" v-bind:key="year">{{year}}</option>
                </select>
            </div>
        </section>

        <section>
            <div class="columns">
                <div class="column"> 
                    <section class="box"> 
                        <h1 class="title">Focus studenti uscenti da: NOMEREGIONE</h1>
                        <h2 class="subtitle">Totale studenti: <strong> {{totalNumber}} </strong> </h2>

                        <b-collapse
                            aria-id="contentIdForA11y2"
                            class="panel"
                            animation="slide"
                            v-model="isIncomingProvincesInfoOpen">
                            <div
                                slot="trigger"
                                class="panel-heading"
                                role="button"
                                aria-controls="contentIdForA11y2">
                                <strong> Da quali province partono </strong>
                            </div>
                            
                            <div class="panel-block">
                               
                               <div class="field">
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                                <b-checkbox>Basic (totale studenti)</b-checkbox>
                            </div>


                               
                            </div>
                        </b-collapse>

                        <p class="subtitle"> Verso quali regioni si spostano </p>
                        <PieChartComponent :chart-data="PIECHART_DATA" :chart-config="PIECHART_CONF" :chart-id="OUTGOING_REGION_PIECHART_ID"/>

                        <p class="subtitle"> Tipologia corso di studi scelto </p>
                        <BarChartComponent :chart-data="BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="OUTGOING_BAR_CHART_FIELD_OF_STUDY" /> 

                        <p class="subtitle"> Trend globale studenti uscenti dalla regione NOMEREGIONE </p>
                        <TrendLineComponent :chart-data="TRENDLINE_DATA" :chart-config="TRENDLINE_CONF" :chart-id="OUTGOING_REGION_TREND_ID"/>
                        

                    </section>
                </div>

                <div class="column"> 
                    <section class="box">
                        <h1 class="title">Focus studenti entranti in: NOMEREGIONE</h1>
                        <h2 class="subtitle">Totale studenti: <strong> {{totalNumber}} </strong> </h2>

                        <p class="subtitle"> Da quali rergioni arrivano </p>
                        <PieChartComponent :chart-data="PIECHART_DATA" :chart-config="PIECHART_CONF" :chart-id="INCOMING_REGION_PIECHART_ID"/>

                        <b-collapse
                            aria-id="contentIdForA11y2"
                            class="panel"
                            animation="slide"
                            v-model="isIncomingProvincesInfoOpen">
                            <div
                                slot="trigger"
                                class="panel-heading"
                                role="button"
                                aria-controls="contentIdForA11y2">
                                <strong> Da quali province arrivano </strong>
                            </div>
                            
                            <div class="panel-block">
                                <ProvincesTableView :provinces-data="PROVINCESTABLE_MOCK" />
                            </div>
                        </b-collapse>
                        

                        <p class="subtitle"> Tipologia corso di studi scelto </p>
                        <BarChartComponent :chart-data="BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="INCOMING_BAR_CHART_FIELD_OF_STUDY" /> 

                        <p class="subtitle"> Trend globale studenti entranti dalla regione NOMEREGIONE </p>
                        <TrendLineComponent :chart-data="TRENDLINE_DATA" :chart-config="TRENDLINE_CONF" :chart-id="INCOMING_REGION_TREND_ID"/>

                    </section>
                </div>

            </div>

        </section>

        
    
        <!-- <button v-on:click="changeData">Change it</button> -->
            
    </div> 
</template>

<script>

import ChoroplethMapComponent from './ChoroplethMapComponent.vue'
import ChordDiagramComponent from './ChordDiagramComponent.vue'
import BarChartComponent from './BarChartComponent.vue'
import TrendLineComponent from './TrendLineComponent.vue'
import PieChartComponent from './PieChartComponent.vue'
import ProvincesTableView from './ProvincesTableView.vue'

import { REGIONS_MOCK_DATA, MAP_CONFIG, MAP_CONFIG2 } from '../data/regions_map_mock'
import { CHORD_DATA, CHORD_DATA2, CHORD_CONFIG } from '../data/chord_diagram_mock'
import { BARCHART_DATA, BARCHART_DATA2, BARCHART_OPTIONS } from '../data/barchart_mock'
import { TRENDLINE_DATA, TRENDLINE_CONF } from '../data/trendline_mock'
import { PIECHART_DATA, PIECHART_CONF } from '../data/piechart_mock'
import { PROVINCESTABLE_MOCK } from '../data/provincestable_mock'

import { 
    MAP_INCOMING_ID,
    MAP_OUTGOING_ID,
    MAIN_BAR_CHART_FIELD_OF_STUDY,
    OUTGOING_BAR_CHART_FIELD_OF_STUDY, 
    OUTGOING_REGION_TREND_ID, 
    OUTGOING_REGION_PIECHART_ID,
    INCOMING_BAR_CHART_FIELD_OF_STUDY, 
    INCOMING_REGION_TREND_ID, 
    INCOMING_REGION_PIECHART_ID
} from '../constants/constants'

export default {
    name: 'SingleYearSearch',
    components: {
        ChoroplethMapComponent,
        ChordDiagramComponent,
        BarChartComponent,
        TrendLineComponent,
        PieChartComponent,
        ProvincesTableView
    },
    data: function() {
        return {
            isIncomingProvincesInfoOpen: false,
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
            PROVINCESTABLE_MOCK,
            MAP_CONFIG,
            MAP_CONFIG2,
            CHORD_DATA,
            CHORD_DATA2,
            CHORD_CONFIG,
            BARCHART_DATA,
            BARCHART_OPTIONS,
            BARCHART_DATA2,
            MAP_INCOMING_ID,
            MAP_OUTGOING_ID,
            MAIN_BAR_CHART_FIELD_OF_STUDY,
            OUTGOING_BAR_CHART_FIELD_OF_STUDY,
            OUTGOING_REGION_TREND_ID,
            OUTGOING_REGION_PIECHART_ID,
            INCOMING_BAR_CHART_FIELD_OF_STUDY, 
            INCOMING_REGION_TREND_ID, 
            INCOMING_REGION_PIECHART_ID,
            TRENDLINE_DATA,
            TRENDLINE_CONF,
            PIECHART_DATA,
            PIECHART_CONF
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
