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
                    <div v-if="!isLoading" class="has-text-centered margin-10-tb">
                        <p class="heading">Studenti immatricolati</p>
                        <p class="title"> {{totalNumber}} </p> 
                    </div>

                    <div class="columns">
                        <div class="column is-one-third">
                            <p class=" has-text-centered"> Informazioni studenti immatricolati </p>
                            <TableComponent v-if="GENERAL_TABLE_DATA" :chart-data="GENERAL_TABLE_DATA"/>
                        </div>

                        <div class="column is-two-third">
                            <p class="has-text-centered"> Flusso degli studenti </p>
                            <ChordDiagramComponent v-if="GENERAL_CHORD_DATA" :chart-data="GENERAL_CHORD_DATA" :chart-config="CHORD_CONFIG" :chart-id="CHORD_GENERAL_SINGLEY_ID"/>
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

        <!-- STATISTICHE DETAILED OUT SECTION-->
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isDetailedOutSectionOpen">

                <div class="has-text-centered">
                    <h2 class="subtitle margin-10-tb has-text-centered"> {{getDetailedInSelectionText()}} </h2>
                    
                    <div class="has-text-centered">
                        <b-button @click="resetDetailedOutSelection"> Reset selezione regioni </b-button>
                    </div>
                </div>
                
                <div
                    slot="trigger" 
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                   >
                    <p class="card-header-title">
                        Studenti in uscita
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>

                <div class="my-card-content" >
                    <div class="columns">
                        <div class="column is-two-third">
                            <h2 class="subtitle has-text-centered"> Da quali regioni si va via? </h2>
                            <ChoroplethMapComponent ref="MAP_OUTGOING_SY" @region-click="onRegionClick" :map-data="DETAILED_OUT_MAP_DATA" v-if="DETAILED_OUT_MAP_DATA" :chart-id="MAP_OUTGOING_ID"/>
                        </div>
                        
                        <div class="column is-one-third">
                            <h2 class="subtitle has-text-centered"> Verso dove ci si sposta? </h2>

                            <div class="has-text-centered">
                                <p class="heading"> Verso la stessa regione </p>
                                <p class="title"> {{DETAILED_OUT_SAME_GRAND_TOTAL}} ({{DETAILED_OUT_SAME_PERCENTAGE}}%) </p> 

                                <p class="heading"> Verso altre regioni</p>
                                <p class="title"> {{DETAILED_OUT_OTHERS_GRAND_TOTAL}} ({{DETAILED_OUT_OTHERS_PERCENTAGE}}%) </p> 
                            </div>
                        </div>
                       
                    </div>


                    <div class="columns">
                        <div class="column is-one-third">
                            <h2 class="subtitle has-text-centered"> Flusso studenti dettagliato </h2>

                            <b-collapse
                                aria-id="contentIdForA11y2"
                                class="panel"
                                animation="slide"
                                v-model="isDetailedOutTabInfoOpen">
                                <div
                                    slot="trigger"
                                    class="panel-heading"
                                    role="button"
                                    aria-controls="contentIdForA11y2">
                                    <strong> Suddivisione regione partenza su regioni di destinazione </strong>
                                </div>
                                
                                <div class="panel-block">
                                    <DetailedTableView :chart-data="DETAILED_OUT_TAB_DATA" v-if="DETAILED_OUT_TAB_DATA"/>
                                </div>
                            </b-collapse>
                        </div>
                        
                        <div class="column is-two-third">
                            <h2 class="subtitle has-text-centered"> Flusso studenti che vanno via </h2>
                            <ChordDiagramComponent ref="DETAILED_CHORD_OUT_SY" v-if="DETAILED_OUT_CHORD_DATA" :chart-data="DETAILED_OUT_CHORD_DATA" :chart-id="CHORD_DETAILED_OUT_SINGLEY_ID" :chart-config="CHORD_CONFIG" :archs-hidable="true"/>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <h2 class="subtitle has-text-centered"> A conseguire quale titolo? </h2>
                            <BarChartComponent v-if="DETAILED_OUT_BARCHART_DATA" :chart-data="DETAILED_OUT_BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="OUT_BAR_CHART_FIELD_OF_STUDY" chart-height="full"/>                             
                        </div>
                    </div>

                    
        
                </div>
            </b-collapse>
        </section>
        
        <!-- STATISTICHE DETAILED IN SECTION-->
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isDetailedInSectionOpen">

                <div class="has-text-centered">
                    <h2 class="subtitle has-text-centered"> Da quali regioni si arriva? </h2>

                    <div class="has-text-centered">
                        <p class="heading"> Dalla stessa regione </p>
                        <p class="title"> {{DETAILED_IN_SAME_GRAND_TOTAL}} ({{DETAILED_IN_SAME_PERCENTAGE}}%) </p> 

                        <p class="heading"> Da altre regioni </p>
                        <p class="title"> {{DETAILED_IN_OTHERS_GRAND_TOTAL}} ({{DETAILED_IN_OTHERS_PERCENTAGE}}%) </p> 
                    </div>
                </div>

                <div class="has-text-centered">
                    <h2 class="subtitle margin-10-tb has-text-centered"> {{getDetailedOutSelectionText()}} </h2>
                    
                    <div class="has-text-centered">
                        <b-button @click="resetDetailedInSelection"> Reset selezione regioni </b-button>
                    </div>
                </div>
                
                <div
                    slot="trigger" 
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                   >
                    <p class="card-header-title">
                        Studenti in arrivo
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>

                <div class="my-card-content">
                    <div class="columns">
                        <div class="column is-two-third">
                            <h2 class="subtitle has-text-centered"> </h2>
                            <ChoroplethMapComponent ref="MAP_INCOMING_SY" @region-click="onRegionClick" :map-data="DETAILED_IN_MAP_DATA" v-if="DETAILED_IN_MAP_DATA" :chart-id="MAP_INCOMING_ID"/>
                        </div>
                    </div>
                </div>
                       

            </b-collapse>
        </section>


    
      
    </div> 
</template>

<script>

// import * as d3 from "d3";
import * as SingleYearSearchService from '../services/SingleYearSearchService.js'
import ChoroplethMapComponent from './ChoroplethMapComponent.vue'
import ChordDiagramComponent from './ChordDiagramComponent.vue'
import BarChartComponent from './BarChartComponent.vue'
// import TrendLineComponent from './TrendLineComponent.vue'
//import PieChartComponent from './PieChartComponent.vue'
import DetailedTableView from './DetailedTableView.vue'
import TableComponent from './TableComponent.vue'
// import MultiSelectComponent from './MultiSelectComponent.vue'

// import { REGIONS_MOCK_DATA, REGIONS_MOCK_DATA2} from '../data/regions_map_mock'
// import { TRENDLINE_DATA, TRENDLINE_CONF } from '../data/trendline_mock'
// import {  PIECHART_CONF } from '../data/piechart_mock'
// import { PROVINCESTABLE_MOCK, PROVINCESTABLE_MOCK2 } from '../data/provincestable_mock'

import {
    CHORD_GENERAL_SINGLEY_ID,
    MAP_INCOMING_ID,
    MAP_OUTGOING_ID,
    MAIN_BAR_CHART_FIELD_OF_STUDY,
    OUT_BAR_CHART_FIELD_OF_STUDY, 
    CHORD_DETAILED_OUT_SINGLEY_ID,
    ACCADEMIC_YEARS,
    DEFAULT_SELECTED_YEAR,
    BARCHART_OPTIONS,
    CHORD_CONFIG,
    REGIONS_LIST
} from '../constants/constants';

export default {
    name: 'SingleYearSearch',
    components: {
        ChoroplethMapComponent,
        ChordDiagramComponent,
        BarChartComponent,
        // TrendLineComponent,
        // PieChartComponent,
        DetailedTableView,
        TableComponent,
        // MultiSelectComponent
    },
    data: function() {
        return {
            isDetailedOutTabInfoOpen: true,
            isGeneralStatisticSingleYearSearchOpen: false,
            isDetailedOutSectionOpen: false,
            isDetailedInSectionOpen: true,
            isThirdBoxOpen: false,
            years: ACCADEMIC_YEARS,
            selectedYear: DEFAULT_SELECTED_YEAR,
            totalNumber: 0,
            // REGIONS_MOCK_DATA,
            // REGIONS_MOCK_DATA2,
            GENERAL_TABLE_DATA: null,
            DETAILED_OUT_BARCHART_DATA: null,
            GENERAL_CHORD_DATA: null,
            DETAILED_OUT_MAP_DATA: null,
            DETAILED_OUT_MAP_CURRENT_SELECTION: REGIONS_LIST,
            DETAILED_IN_MAP_CURRENT_SELECTION: REGIONS_LIST,
            DETAILED_IN_MAP_DATA: null,
            DETAILED_OUT_TAB_DATA: null,
            // OUTGOING_PIE_DATA: null,
            DETAILED_OUT_TABLE_DATA: null,
            DETAILED_OUT_CHORD_DATA: null,
            DETAILED_OUT_SAME_PERCENTAGE : null,
            DETAILED_OUT_SAME_GRAND_TOTAL : null,
            DETAILED_OUT_OTHERS_PERCENTAGE: null,
            DETAILED_OUT_OTHERS_GRAND_TOTAL: null,
            DETAILED_IN_SAME_PERCENTAGE : null,
            DETAILED_IN_SAME_GRAND_TOTAL : null,
            DETAILED_IN_OTHERS_PERCENTAGE: null,
            DETAILED_IN_OTHERS_GRAND_TOTAL: null,
            isLoading: false,
            CHORD_CONFIG,
            BARCHART_OPTIONS,
            CHORD_GENERAL_SINGLEY_ID,
            MAP_INCOMING_ID,
            MAP_OUTGOING_ID,
            MAIN_BAR_CHART_FIELD_OF_STUDY,
            OUT_BAR_CHART_FIELD_OF_STUDY,
            CHORD_DETAILED_OUT_SINGLEY_ID,
            // TRENDLINE_DATA,
            // TRENDLINE_CONF,
            //PIECHART_DATA,
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
                that.DETAILED_OUT_MAP_DATA = data.detailedOutMapData;
                that.DETAILED_IN_MAP_DATA = data.detailedInMapData;
                that.DETAILED_OUT_TAB_DATA = data.detailedOutTabData;
                that.DETAILED_OUT_BARCHART_DATA = data.detailedOutBarChartData;
                // that.OUTGOING_PIE_DATA = data.detailedOutPieChartData;
                that.DETAILED_OUT_CHORD_DATA = data.detailedOutChordData;
                
                that.DETAILED_OUT_SAME_GRAND_TOTAL = data.detailedOutPercentage.sameGrandTotal;
                that.DETAILED_OUT_OTHERS_GRAND_TOTAL = data.detailedOutPercentage.othersGrandTotal;
                that.DETAILED_OUT_SAME_PERCENTAGE = data.detailedOutPercentage.samePercentage;
                that.DETAILED_OUT_OTHERS_PERCENTAGE = data.detailedOutPercentage.othersPercentage;
                
                that.DETAILED_IN_SAME_GRAND_TOTAL = data.detailedInPercentage.sameGrandTotal;
                that.DETAILED_IN_OTHERS_GRAND_TOTAL = data.detailedInPercentage.othersGrandTotal;
                that.DETAILED_IN_SAME_PERCENTAGE = data.detailedInPercentage.samePercentage;
                that.DETAILED_IN_OTHERS_PERCENTAGE = data.detailedInPercentage.othersPercentage;

                // that.isGeneralStatisticSingleYearSearchOpen = true;
                // that.isDetailedOutSectionOpen = true;
                that.isDetailedInSectionOpen = true;
                that.isLoading = false;
            }).catch(function (err) {
                console.log(err)
            });
        },
        onYearSelection() {
            this.DETAILED_OUT_MAP_CURRENT_SELECTION = REGIONS_LIST;
            this.DETAILED_IN_MAP_CURRENT_SELECTION = REGIONS_LIST;
            this.forceDetailedOutComponentReset();
            this.initializeSingleYearSearch();
        },
        updateDetailedOutSectionData() {
            let data = SingleYearSearchService.updateOutDetailedView(this.DETAILED_OUT_MAP_CURRENT_SELECTION);
            console.log(data)
            this.DETAILED_OUT_MAP_DATA = data.detailedOutMapData;
            this.DETAILED_OUT_TAB_DATA = data.detailedOutTabData;
            this.DETAILED_OUT_BARCHART_DATA = data.detailedOutBarChartData;
            this.DETAILED_OUT_CHORD_DATA = data.detailedOutChordData;
            this.DETAILED_OUT_SAME_PERCENTAGE = data.detailedOutPercentage.samePercentage;
            this.DETAILED_OUT_OTHERS_PERCENTAGE = data.detailedOutPercentage.othersPercentage;
            this.DETAILED_OUT_SAME_GRAND_TOTAL = data.detailedOutPercentage.sameGrandTotal;
            this.DETAILED_OUT_OTHERS_GRAND_TOTAL = data.detailedOutPercentage.othersGrandTotal;
        },
        updateDetailedInSectionData() {
            let data = SingleYearSearchService.updateInDetailedView(this.DETAILED_IN_MAP_CURRENT_SELECTION);
            console.log(data)

            this.DETAILED_IN_MAP_DATA = data.detailedInMapData;
            this.DETAILED_IN_SAME_GRAND_TOTAL = data.detailedInPercentage.sameGrandTotal;
            this.DETAILED_IN_OTHERS_GRAND_TOTAL = data.detailedInPercentage.othersGrandTotal;
            this.DETAILED_IN_SAME_PERCENTAGE = data.detailedInPercentage.samePercentage;
            this.DETAILED_IN_OTHERS_PERCENTAGE = data.detailedInPercentage.othersPercentage;

            // this.DETAILED_OUT_TAB_DATA = data.detailedOutTabData;
            // this.DETAILED_OUT_BARCHART_DATA = data.detailedOutBarChartData;
            // this.DETAILED_OUT_CHORD_DATA = data.detailedOutChordData;
            // this.DETAILED_OUT_SAME_PERCENTAGE = data.detailedOutPercentage.samePercentage;
            // this.DETAILED_OUT_OTHERS_PERCENTAGE = data.detailedOutPercentage.othersPercentage;
            // this.DETAILED_OUT_SAME_GRAND_TOTAL = data.detailedOutPercentage.sameGrandTotal;
            // this.DETAILED_OUT_OTHERS_GRAND_TOTAL = data.detailedOutPercentage.othersGrandTotal;
        },
        onRegionClick(param) {
            if (param.chartId == this.MAP_OUTGOING_ID) {
                this.DETAILED_OUT_MAP_CURRENT_SELECTION = param.activatedRegions;
                this.updateDetailedOutSectionData();
            } else {
                this.DETAILED_IN_MAP_CURRENT_SELECTION = param.activatedRegions;
                this.updateDetailedInSectionData();
            }
        },
        forceDetailedOutComponentReset() {
            this.$refs.MAP_OUTGOING_SY.setRegionsAsActive(this.DETAILED_OUT_MAP_CURRENT_SELECTION);
            this.$refs.DETAILED_CHORD_OUT_SY.resetHiddenArchState();
        },
        forceDetailedInComponentReset() {
            this.$refs.MAP_INCOMING_SY.setRegionsAsActive(this.DETAILED_IN_MAP_CURRENT_SELECTION);
            // this.$refs.DETAILED_CHORD_OUT_SY.resetHiddenArchState();
        },
        resetDetailedOutSelection () {
            this.DETAILED_OUT_MAP_CURRENT_SELECTION = REGIONS_LIST;
            this.forceDetailedOutComponentReset();
            this.updateDetailedOutSectionData();
        },
        resetDetailedInSelection() {
            this.DETAILED_IN_MAP_CURRENT_SELECTION = REGIONS_LIST;
            this.forceDetailedInComponentReset();
            this.updateDetailedInSectionData();
        },
        getDetailedInSelectionText() {
            return SingleYearSearchService.getDetailedInSelectionText(this.DETAILED_OUT_MAP_CURRENT_SELECTION)
        },
        getDetailedOutSelectionText() {
            return SingleYearSearchService.getDetailedOutSelectionText(this.DETAILED_IN_MAP_CURRENT_SELECTION)
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
