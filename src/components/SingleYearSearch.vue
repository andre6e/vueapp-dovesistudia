<template>
    <div class="container is-fluid">

        <!-- LOADING GIF -->
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>

        <!-- COUNTER STUDENTI SECTION -->
        <section>
            <div class="has-text-centered">
                <b-field label="Selezione anno accademico">
                    <b-select class="has-text-centered" placeholder="Select a name" @change.native="onYearSelection()" v-model="selectedYear">
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

            <div v-if="!isLoading" class="has-text-centered">
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
                        <div class="column is-one-third">
                            <p class=" has-text-centered"> Informazioni studenti immatricolati </p>
                            <TableComponent v-if="GENERAL_TABLE_DATA" :chart-data="GENERAL_TABLE_DATA"/>
                        </div>

                        <div class="column is-two-third">
                            <p class="has-text-centered"> Flusso degli studenti </p>
                            <ChordDiagramComponent v-if="GENERAL_CHORD_DATA" :chart-data="GENERAL_CHORD_DATA" :chart-config="CHORD_CONFIG" />
                        </div>
                    </div>

                    <!-- 

                    <div class="columns">
                        <div class="column">
                            <p class=" has-text-centered"> Tipologia corso di Laurea </p>
                            <BarChartComponent v-if="GENERAL_BARCHART_DATA" :chart-data="GENERAL_BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="MAIN_BAR_CHART_FIELD_OF_STUDY" chart-height="full"/>
                        </div>
                    </div>

                    -->

                </div>
            </b-collapse>
        </section>

        <!-- STATISTICHE DETAILED INTERATTIVE SECTION-->
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isDetailedStatisticSectionOpen">
                
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

                            <ChoroplethMapComponent ref="MAP_OUTGOING" @region-click="onRegionClick" :map-data="DETAILED_OUT_MAP_DATA" v-if="DETAILED_OUT_MAP_DATA" :chart-id="MAP_OUTGOING_ID"/>
                        </div>

                        <div class="column" >
                            <h2 class="subtitle has-text-centered"> Studenti in entrata nelle regioni </h2>
                            
                            <ChoroplethMapComponent ref="MAP_INCOMING" @region-click="onRegionClick" :map-data="DETAILED_IN_MAP_DATA" v-if="DETAILED_IN_MAP_DATA" :chart-id="MAP_INCOMING_ID"/>

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
                                    <strong> Suddivisione province di provenienza </strong>
                                </div>
                                
                                <div class="panel-block">
                                    <ProvincesTableView :provinces-data="DETAILED_PROVINCES_TAB_DATA" v-if="DETAILED_PROVINCES_TAB_DATA"/>
                                </div>
                            </b-collapse>
                        </div>
                        
                        <div class="column">
                            <h2 class="subtitle has-text-centered"> Tipologia corso di studio </h2>

                            <BarChartComponent v-if="DETAILED_BARCHART_DATA" :chart-data="DETAILED_BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="INCOMING_BAR_CHART_FIELD_OF_STUDY" chart-height="full"/> 
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

// import { REGIONS_MOCK_DATA, REGIONS_MOCK_DATA2} from '../data/regions_map_mock'
// import { TRENDLINE_DATA, TRENDLINE_CONF } from '../data/trendline_mock'
// import { PIECHART_DATA, PIECHART_CONF } from '../data/piechart_mock'
// import { PROVINCESTABLE_MOCK, PROVINCESTABLE_MOCK2 } from '../data/provincestable_mock'

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
    BARCHART_OPTIONS,
    CHORD_CONFIG
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
            isIncomingProvincesInfoOpen: true,
            isGeneralStatisticSingleYearSearchOpen: false,
            isDetailedStatisticSectionOpen: false,
            isThirdBoxOpen: false,
            years: ACCADEMIC_YEARS,
            selectedYear: DEFAULT_SELECTED_YEAR,
            totalNumber: 0,
            // REGIONS_MOCK_DATA,
            // REGIONS_MOCK_DATA2,
            GENERAL_TABLE_DATA: null,
            DETAILED_BARCHART_DATA: null,
            GENERAL_CHORD_DATA: null,
            DETAILED_OUT_MAP_DATA: null,
            DETAILED_IN_MAP_DATA: null,
            DETAILED_PROVINCES_TAB_DATA: null,
            isLoading: false,
            CHORD_CONFIG,
            BARCHART_OPTIONS,
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
        this.initializeSingleYearSearch();
    },
    methods: {
        initializeSingleYearSearch() {
            // alla search al cambio dell'anno resetto le mappe alla totalità
            var that = this;
            this.isLoading = true;

            SingleYearSearchService.getSingleYearData(this.selectedYear).then(function (data) {
                console.log(data)
                that.totalNumber = data.totalNumber;
                that.GENERAL_TABLE_DATA = data.generalTabData;
                that.GENERAL_CHORD_DATA = data.generalChordData;
                that.DETAILED_OUT_MAP_DATA = data.outMapData;
                that.DETAILED_IN_MAP_DATA = data.inMapData;
                that.DETAILED_PROVINCES_TAB_DATA = data.detailedTabData;
                that.DETAILED_BARCHART_DATA = data.detailedBarChartData;

                //that.isGeneralStatisticSingleYearSearchOpen = true;
                that.isDetailedStatisticSectionOpen = true;
                that.isLoading = false;
            }).catch(function (err) {
                console.log(err)
            });
        },
        onYearSelection() {
            this.initializeSingleYearSearch();
            // this.BARCHART_DATA = this.BARCHART_DATA2;
        },
        onRegionClick(param) {
            let outgoing, incoming;

            if (param.chartId == this.MAP_OUTGOING_ID) {
                outgoing = param.activatedRegions;
                
                let data = SingleYearSearchService.updateDetailedView(outgoing, null);
                console.log(data)
                this.DETAILED_OUT_MAP_DATA = data.outMapData;
                this.DETAILED_IN_MAP_DATA = data.inMapData;
                this.DETAILED_PROVINCES_TAB_DATA = data.detailedTabData;
                this.DETAILED_BARCHART_DATA = data.detailedBarChartData;
                this.$refs.MAP_INCOMING.setRegionsAsActive(data.incomingList);
            } else {
                incoming = param.activatedRegions;
                
                let data = SingleYearSearchService.updateDetailedView(null, incoming);
                console.log(data)
                this.DETAILED_OUT_MAP_DATA = data.outMapData;
                this.DETAILED_IN_MAP_DATA = data.inMapData;
                this.$refs.MAP_OUTGOING.setRegionsAsActive(data.outgoingList);
            }
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
