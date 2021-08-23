<template>
    <div class="container is-fluid">

        <!-- COUNTER STUDENTI SECTION -->
        <section>
            <div class="has-text-centered">
                <b-field label="Selezione anno accademico">
                    <b-select class="has-text-centered" placeholder="Select a name" @change.native="changeData()" v-model="selectedYear">
                        <option
                            v-for="year in years"
                            :value="year"
                            :key="year"
                            >
                            {{ year }}
                        </option>
                    </b-select>
                </b-field>
            </div>

            <div class="has-text-centered">
                <p class="heading">Studenti immatricolati</p>
                <p class="title"> {{totalNumber}} </p> 
            </div>
        </section>

        <!-- STATISTICHE GENERALI SECTION -->
        <section>
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3"  v-model="isGeneralStatisticSingleYearSearchOpen">
                
                <div
                    slot="trigger" 
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                   >
                    <p class="card-header-title">
                        Statistiche generali
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>

                <div class="my-card-content"> 
                    <div class="columns">
                        <div class="column has-text-centered ">
                            <p> Informazioni studenti immatricolati </p>
                            <TableComponent :chart-data="SIMPLETABLE_MOCK"/>
                        </div>

                        <div class="column has-text-centered ">
                            <p> Flusso degli studenti </p>
                            <ChordDiagramComponent :chart-data="CHORD_DATA" :chart-config="CHORD_CONFIG" />
                        </div>

                        <div class="column has-text-centered">
                            <p> Tipologia corso di Laurea </p>
                            <BarChartComponent :chart-data="BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="MAIN_BAR_CHART_FIELD_OF_STUDY" chart-height="full"/>
                        </div>
                    </div>
                </div>
            </b-collapse>
        </section>

        <!-- STATISTICHE DETAILED INTERATTIVE SECTION-->
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isSecondBoxOpen">
                
                <div
                    slot="trigger" 
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                   >
                    <p class="card-header-title">
                        Studenti in uscita/entrata
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>

                <div class="my-card-content" >
                    
                    <div class="columns">
    
                        <div class="column">
                            <h2 class="subtitle has-text-centered"> Studenti in uscita dalle regioni </h2>

                            
                            <ChoroplethMapComponent ref="MAP_OUTGOING" @region-click="onRegionClick" :map-data="REGIONS_MOCK_DATA" :map-config="MAP_CONFIG" :chart-id="MAP_OUTGOING_ID"/>

                            
                            
                        </div>

                        <div class="column" >
                            <h2 class="subtitle has-text-centered"> Studenti in entrata nelle regioni </h2>

                            
                            <ChoroplethMapComponent ref="MAP_INCOMING" @region-click="onRegionClick" :map-data="REGIONS_MOCK_DATA2" :map-config="MAP_CONFIG2" :chart-id="MAP_INCOMING_ID"/>

                           
                            
                        </div>
                    </div>


                    <div class="columns">
                        <div class="column">
                            <h2 class="subtitle has-text-centered"> Province provenienza </h2>

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
                        </div>
                        
                        <div class="column">
                            <h2 class="subtitle has-text-centered"> Tipologia corso di studio </h2>

                            <BarChartComponent :chart-data="BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="INCOMING_BAR_CHART_FIELD_OF_STUDY" chart-height="full"/> 
                        </div>
                    </div>
        
                </div>
            </b-collapse>
        </section>


        <!--
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3"  v-model="isThirdBoxOpen">
                
                <div
                    slot="trigger" 
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                   >
                    <p class="card-header-title">
                        Provenienza e corso di studio
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>

                <div class="my-card-content">
                    
                     <div class="columns">
    
                    <div class="column">
                        
                       
                    </div>

                    <div class="column">
                        
                    </div>
                </div>
        
                </div>
            </b-collapse>
        </section>
        -->
    
        <!-- <button v-on:click="changeData">Change it</button> -->
            
    </div> 
</template>

<script>

// import * as d3 from "d3";
import * as SingleYearSearchService from '../services/SingleYearSearchService.js'
import ChoroplethMapComponent from './ChoroplethMapComponent.vue'
import ChordDiagramComponent from './ChordDiagramComponent.vue'
import BarChartComponent from './BarChartComponent.vue'
// import TrendLineComponent from './TrendLineComponent.vue'
// import PieChartComponent from './PieChartComponent.vue'
import ProvincesTableView from './ProvincesTableView.vue'
import TableComponent from './TableComponent.vue'
// import MultiSelectComponent from './MultiSelectComponent.vue'

import { REGIONS_MOCK_DATA, REGIONS_MOCK_DATA2, MAP_CONFIG, MAP_CONFIG2 } from '../data/regions_map_mock'
import { CHORD_DATA, CHORD_DATA2, CHORD_CONFIG } from '../data/chord_diagram_mock'
import { BARCHART_DATA, BARCHART_DATA2 } from '../data/barchart_mock'
// import { TRENDLINE_DATA, TRENDLINE_CONF } from '../data/trendline_mock'
// import { PIECHART_DATA, PIECHART_CONF } from '../data/piechart_mock'
import { PROVINCESTABLE_MOCK, PROVINCESTABLE_MOCK2 } from '../data/provincestable_mock'
import { SIMPLETABLE_MOCK } from '../data/simpletable_mock'

import { 
    MAP_INCOMING_ID,
    MAP_OUTGOING_ID,
    MAIN_BAR_CHART_FIELD_OF_STUDY,
    OUTGOING_BAR_CHART_FIELD_OF_STUDY, 
    OUTGOING_REGION_TREND_ID, 
    OUTGOING_REGION_PIECHART_ID,
    INCOMING_BAR_CHART_FIELD_OF_STUDY, 
    INCOMING_REGION_TREND_ID, 
    INCOMING_REGION_PIECHART_ID,
    ACCADEMIC_YEARS,
    DEFAULT_SELECTED_YEAR,
    BARCHART_OPTIONS
    // CSV_KEYS
} from '../constants/constants';

export default {
    name: 'SingleYearSearch',
    components: {
        ChoroplethMapComponent,
        ChordDiagramComponent,
        BarChartComponent,
        // TrendLineComponent,
        // PieChartComponent,
        ProvincesTableView,
        TableComponent,
        // MultiSelectComponent
    },
    data: function() {
        return {
            isIncomingProvincesInfoOpen: false,
            isGeneralStatisticSingleYearSearchOpen: true,
            isSecondBoxOpen: true,
            isThirdBoxOpen: true,
            years: ACCADEMIC_YEARS,
            selectedYear: DEFAULT_SELECTED_YEAR,
            totalNumber: 0,
            totalStudentsNumber: {
                "2010-11": 100,
                "2011-12": 200,
                "2012-13": 300,
                "2013-14": 400,
                "2014-15": 500,
                "2015-16": 600,
                "2016-17": 700,
                "2017-18": 800,
                "2018-19": 900,
            },
            REGIONS_MOCK_DATA,
            REGIONS_MOCK_DATA2,
            PROVINCESTABLE_MOCK,
            PROVINCESTABLE_MOCK2,
            SIMPLETABLE_MOCK,
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
            // TRENDLINE_DATA,
            // TRENDLINE_CONF,
            // PIECHART_DATA,
            // PIECHART_CONF
        }
    },
    mounted: function() {
        // ci sarà da controllare se al cambio tab si ripassa da qui e si fa un refresh non richiesto
        console.log("mounted")
        this.initializeSingleYearSearch();
    },
    methods: {
        initializeSingleYearSearch() {
            var that = this;

            SingleYearSearchService.getSingleYearData(this.selectedYear).then(function (data) {
                console.log(data)
                that.totalNumber = data.totalNumber;
                that.SIMPLETABLE_MOCK = data.generalTabData;
                that.BARCHART_DATA = data.generalBarChartData;
            }).catch(function (err) {
                console.log(err)
            });
        },
        getStudentsTotalNumber() {
            this.totalNumber = this.totalStudentsNumber[this.selectedYear]
        },
        changeData() {
            this.initializeSingleYearSearch();
            // this.CHORD_DATA = this.CHORD_DATA2;
            // this.BARCHART_DATA = this.BARCHART_DATA2;
        },
        updateDetailedView() {
            this.PROVINCESTABLE_MOCK = this.PROVINCESTABLE_MOCK2;
        },
        onRegionClick(param) {
            let outgoing, incoming;

            if (param.chartId == this.MAP_OUTGOING_ID) {
                outgoing = param.activatedRegions;
                incoming = this.$refs.MAP_INCOMING.getCurrentActivatedRegion();
            } else {
                incoming = param.activatedRegions;
                outgoing = this.$refs.MAP_OUTGOING.getCurrentActivatedRegion();
            }

            console.log("INCOMING", incoming)
            console.log("OUTGOING", outgoing)

            this.updateDetailedView();
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-10-tb {
    margin: 10px 0px
}

.my-card-content {
    padding: 1rem;
}

</style>
