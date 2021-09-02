<template>
    <div class="container is-fluid">

        <!-- LOADING GIF -->
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>

        <!-- COUNTER STUDENTI SECTION -->
        <section>
            <div class="has-text-centered">
                <b-field label="Seleziona l'anno accademico">
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

        <section v-if="!isLoading">
            <div class="has-text-centered margin-10-tb">
                <p class="heading">Studenti iscritti</p>
                <p class="title"> {{getLocaleStringValue(totalNumber)}}  </p> 
            </div>
        </section>

        <!-- STATISTICHE GENERALI SECTION -->
        <section>
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isGeneralStatisticSingleYearSearchOpen">
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
                            <p class="has-text-centered"> Recap studenti per regione </p>
                            <TableComponent v-if="GENERAL_TABLE_DATA" :chart-data="GENERAL_TABLE_DATA"/>
                        </div>

                        <div class="column is-two-third">
                            <p class="has-text-centered"> Flusso degli studenti </p>
                            <ChordDiagramComponent v-if="GENERAL_CHORD_DATA" :chart-data="GENERAL_CHORD_DATA" :chart-config="CHORD_CONFIG" :chart-id="CHORD_GENERAL_SINGLEY_ID"/>
                        </div>
                    </div>
                </div>
            </b-collapse>
        </section>

        <!-- STATISTICHE DETAILED OUT SECTION-->
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isDetailedOutSectionOpen">
                
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

                <div class="my-card-content" v-if="!isLoading">
                    <div>       
                        <div class="media-content margin-10-b">
                            <div class="content info-section">
                                <p class="has-text-centered">
                                    Questa sezione permette di analizzare il flusso di studenti in uscita dalle regioni.
                                    Il click su mappa della regione di interesse permetterà di analizzare "verso dove" si sono spostati gli studenti residenti nella regione selezionata.
                                    I dati di tutti i grafi appartenenti a questa sezione verranno aggiornati interattivamente in base alla selezione delle regioni effettuata tramite mappa.
                                </p>
                            </div>
                        </div>
                        
                        <div class="has-text-centered">
                            <p class="heading"> Totale studenti iscritti </p>
                            <p class="title"> {{getLocaleStringValue(DETAILED_OUT_SAME_GRAND_TOTAL + DETAILED_OUT_OTHERS_GRAND_TOTAL)}} </p> 

                            <p class="heading"> Studenti che restano nella stessa regione </p>
                            <p class="title"> {{getLocaleStringValue(DETAILED_OUT_SAME_GRAND_TOTAL)}} ({{DETAILED_OUT_SAME_PERCENTAGE}}%) </p> 

                            <p class="heading"> Studenti che si spostano verso altre regioni </p>
                            <p class="title"> {{getLocaleStringValue(DETAILED_OUT_OTHERS_GRAND_TOTAL)}} ({{DETAILED_OUT_OTHERS_PERCENTAGE}}%) </p> 
                        </div>
                        
                        <div class="margin-10-tb selected-region-section">
                            <p> {{getDetailedOutSelectionText()}} </p>
                            <b-button class="auto-margin-left" size="is-small" @click="resetDetailedOutSelection"> Reset selezione regioni </b-button>
                        </div> 
                    </div>

                    <div class="columns">
                        <div class="column">
                            <ChoroplethMapComponent ref="MAP_OUTGOING_SY" @region-click="onRegionClick" :map-data="DETAILED_OUT_MAP_DATA" v-if="DETAILED_OUT_MAP_DATA" :chart-id="MAP_OUTGOING_ID"/>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <p class="has-text-centered"> Flusso degli studenti </p>
                            <ChordDiagramComponent ref="DETAILED_CHORD_OUT_SY" v-if="DETAILED_OUT_CHORD_DATA" :chart-data="DETAILED_OUT_CHORD_DATA" :chart-id="CHORD_DETAILED_OUT_SINGLEY_ID" :chart-config="CHORD_CONFIG" :archs-hidable="true"/>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
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

                        <div class="column">
                            <p class="has-text-centered"> A conseguire quale titolo? </p>
                            <BarChartComponent v-if="DETAILED_OUT_BARCHART_DATA" :chart-data="DETAILED_OUT_BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="OUT_BAR_CHART_FIELD_OF_STUDY" chart-height="full"/>                             
                        </div>
                    </div>      
                </div>
            </b-collapse>
        </section>
        
        <!-- STATISTICHE DETAILED IN SECTION-->
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isDetailedInSectionOpen">

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

                <div class="my-card-content" v-if="!isLoading">
                    <div>
                        <div class="media-content margin-10-b">
                            <div class="content info-section">
                                <p class="has-text-centered">
                                    Questa sezione permette di analizzare il flusso di studenti in arrivo in determinate regioni.
                                    Il click su mappa della regione di interesse permetterà di analizzare "da dove" gli studenti sono arrivati nella regione selezionata.
                                    I dati di tutti i grafi appartenenti a questa sezione verranno aggiornati interattivamente in base alla selezione delle regioni effettuata tramite mappa.
                                </p>
                            </div>
                        </div>

                        <div class="has-text-centered">
                            <p class="heading"> Totale studenti iscritti </p>
                            <p class="title"> {{getLocaleStringValue(DETAILED_IN_OTHERS_GRAND_TOTAL + DETAILED_IN_SAME_GRAND_TOTAL)}}  </p> 

                            <p class="heading"> Studenti che arrivano dalla stessa regione </p>
                            <p class="title"> {{getLocaleStringValue(DETAILED_IN_SAME_GRAND_TOTAL)}} ({{DETAILED_IN_SAME_PERCENTAGE}}%) </p> 

                            <p class="heading"> Studenti che arrivano da altre regioni </p>
                            <p class="title"> {{getLocaleStringValue(DETAILED_IN_OTHERS_GRAND_TOTAL)}} ({{DETAILED_IN_OTHERS_PERCENTAGE}}%) </p> 
                        </div>

                        <div class="margin-10-tb selected-region-section">
                            <p> {{getDetailedInSelectionText()}} </p>
                            <b-button class="auto-margin-left" size="is-small" @click="resetDetailedInSelection"> Reset selezione regioni </b-button>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <ChoroplethMapComponent ref="MAP_INCOMING_SY" @region-click="onRegionClick" :map-data="DETAILED_IN_MAP_DATA" v-if="DETAILED_IN_MAP_DATA" :chart-id="MAP_INCOMING_ID"/>
                        </div>
                    </div>
                    
                    <div class="columns">
                        <div class="column">
                            <p class="has-text-centered"> Flusso degli studenti </p>
                            <ChordDiagramComponent ref="DETAILED_CHORD_IN_SY" v-if="DETAILED_IN_CHORD_DATA" :chart-data="DETAILED_IN_CHORD_DATA" :chart-id="CHORD_DETAILED_IN_SINGLEY_ID" :chart-config="CHORD_CONFIG" :archs-hidable="true"/>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column">
                            <b-collapse
                                aria-id="contentIdForA11y2"
                                class="panel"
                                animation="slide"
                                v-model="isDetailedInTabInfoOpen">
                                <div
                                    slot="trigger"
                                    class="panel-heading"
                                    role="button"
                                    aria-controls="contentIdForA11y2">
                                    <strong> Suddivisione regione di destinazione su regioni di partenza </strong>
                                </div>
                                
                                <div class="panel-block">
                                    <DetailedTableView :chart-data="DETAILED_IN_TAB_DATA" v-if="DETAILED_IN_TAB_DATA"/>
                                </div>
                            </b-collapse>
                        </div>

                        <div class="column">
                            <p class="has-text-centered"> A conseguire quale titolo? </p>
                            <BarChartComponent v-if="DETAILED_IN_BARCHART_DATA" :chart-data="DETAILED_IN_BARCHART_DATA" :chart-config="BARCHART_OPTIONS" :chart-id="IN_BAR_CHART_FIELD_OF_STUDY" chart-height="full"/>                             
                        </div>
                    </div>
                </div>
            </b-collapse>
        </section>
    </div> 
</template>

<script>

import * as SingleYearSearchService from '../services/SingleYearSearchService.js'
import ChoroplethMapComponent from './ChoroplethMapComponent.vue'
import ChordDiagramComponent from './ChordDiagramComponent.vue'
import BarChartComponent from './BarChartComponent.vue'
import DetailedTableView from './DetailedTableView.vue'
import TableComponent from './TableComponent.vue'

import {
    CHORD_GENERAL_SINGLEY_ID,
    MAP_INCOMING_ID,
    MAP_OUTGOING_ID,
    MAIN_BAR_CHART_FIELD_OF_STUDY,
    OUT_BAR_CHART_FIELD_OF_STUDY, 
    IN_BAR_CHART_FIELD_OF_STUDY, 
    CHORD_DETAILED_OUT_SINGLEY_ID,
    CHORD_DETAILED_IN_SINGLEY_ID,
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
        DetailedTableView,
        TableComponent
    },
    data: function() {
        return {
            isDetailedOutTabInfoOpen: true,
            isDetailedInTabInfoOpen: true,
            isGeneralStatisticSingleYearSearchOpen: false,
            isDetailedOutSectionOpen: false,
            isDetailedInSectionOpen: false,
            years: ACCADEMIC_YEARS,
            selectedYear: DEFAULT_SELECTED_YEAR,
            totalNumber: 0,
            GENERAL_TABLE_DATA: null,
            DETAILED_OUT_BARCHART_DATA: null,
            DETAILED_IN_BARCHART_DATA: null,
            GENERAL_CHORD_DATA: null,
            DETAILED_OUT_MAP_DATA: null,
            DETAILED_OUT_MAP_CURRENT_SELECTION: REGIONS_LIST,
            DETAILED_IN_MAP_CURRENT_SELECTION: REGIONS_LIST,
            DETAILED_IN_MAP_DATA: null,
            DETAILED_OUT_TAB_DATA: null,
            DETAILED_IN_TAB_DATA: null,
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
            DETAILED_IN_CHORD_DATA: null,
            isLoading: false,
            CHORD_CONFIG,
            BARCHART_OPTIONS,
            CHORD_GENERAL_SINGLEY_ID,
            MAP_INCOMING_ID,
            MAP_OUTGOING_ID,
            MAIN_BAR_CHART_FIELD_OF_STUDY,
            OUT_BAR_CHART_FIELD_OF_STUDY,
            IN_BAR_CHART_FIELD_OF_STUDY,
            CHORD_DETAILED_OUT_SINGLEY_ID,
            CHORD_DETAILED_IN_SINGLEY_ID,
        }
    },
    mounted: function() {
        this.initializeSingleYearSearch();
    },
    methods: {
        initializeSingleYearSearch() {
            var that = this;
            this.isLoading = true;

            SingleYearSearchService.getSingleYearData(this.selectedYear).then(function (data) {
                console.log("SINGLE YEAR SEARCH RECEIVED ELAB DATA", data)
                that.totalNumber = data.totalNumber;
                that.GENERAL_TABLE_DATA = data.generalTabData;
                that.GENERAL_CHORD_DATA = data.generalChordData;
                
                that.DETAILED_OUT_MAP_DATA = data.detailedOutMapData;
                that.DETAILED_IN_MAP_DATA = data.detailedInMapData;

                that.DETAILED_OUT_TAB_DATA = data.detailedOutTabData;
                that.DETAILED_IN_TAB_DATA = data.detailedInTabData;

                that.DETAILED_OUT_BARCHART_DATA = data.detailedOutBarChartData;
                that.DETAILED_IN_BARCHART_DATA = data.detailedInBarChartData;

                that.DETAILED_OUT_CHORD_DATA = data.detailedOutChordData;
                that.DETAILED_IN_CHORD_DATA = data.detailedInChordData;
                
                that.DETAILED_OUT_SAME_GRAND_TOTAL = data.detailedOutPercentage.sameGrandTotal;
                that.DETAILED_OUT_OTHERS_GRAND_TOTAL = data.detailedOutPercentage.othersGrandTotal;
                that.DETAILED_OUT_SAME_PERCENTAGE = data.detailedOutPercentage.samePercentage;
                that.DETAILED_OUT_OTHERS_PERCENTAGE = data.detailedOutPercentage.othersPercentage;
                
                that.DETAILED_IN_SAME_GRAND_TOTAL = data.detailedInPercentage.sameGrandTotal;
                that.DETAILED_IN_OTHERS_GRAND_TOTAL = data.detailedInPercentage.othersGrandTotal;
                that.DETAILED_IN_SAME_PERCENTAGE = data.detailedInPercentage.samePercentage;
                that.DETAILED_IN_OTHERS_PERCENTAGE = data.detailedInPercentage.othersPercentage;

                that.isGeneralStatisticSingleYearSearchOpen = true;
                that.isDetailedOutSectionOpen = true;
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
            this.forceDetailedInComponentReset();
            this.initializeSingleYearSearch();
        },
        updateDetailedOutSectionData() {
            this.isLoading = true;
            let data = SingleYearSearchService.updateOutDetailedView(this.DETAILED_OUT_MAP_CURRENT_SELECTION);
            console.log("SINGLE YEAR SEARCH OUT SECTION RECEIVED ELAB DATA", data)
            this.DETAILED_OUT_MAP_DATA = data.detailedOutMapData;
            this.DETAILED_OUT_TAB_DATA = data.detailedOutTabData;
            this.DETAILED_OUT_BARCHART_DATA = data.detailedOutBarChartData;
            this.DETAILED_OUT_CHORD_DATA = data.detailedOutChordData;
            this.DETAILED_OUT_SAME_PERCENTAGE = data.detailedOutPercentage.samePercentage;
            this.DETAILED_OUT_OTHERS_PERCENTAGE = data.detailedOutPercentage.othersPercentage;
            this.DETAILED_OUT_SAME_GRAND_TOTAL = data.detailedOutPercentage.sameGrandTotal;
            this.DETAILED_OUT_OTHERS_GRAND_TOTAL = data.detailedOutPercentage.othersGrandTotal;
            this.isLoading = false;
        },
        updateDetailedInSectionData() {
            this.isLoading = true;
            let data = SingleYearSearchService.updateInDetailedView(this.DETAILED_IN_MAP_CURRENT_SELECTION);
            console.log("SINGLE YEAR SEARCH IN SECTION RECEIVED ELAB DATA", data)

            this.DETAILED_IN_MAP_DATA = data.detailedInMapData;
            this.DETAILED_IN_SAME_GRAND_TOTAL = data.detailedInPercentage.sameGrandTotal;
            this.DETAILED_IN_OTHERS_GRAND_TOTAL = data.detailedInPercentage.othersGrandTotal;
            this.DETAILED_IN_SAME_PERCENTAGE = data.detailedInPercentage.samePercentage;
            this.DETAILED_IN_OTHERS_PERCENTAGE = data.detailedInPercentage.othersPercentage;

            this.DETAILED_IN_TAB_DATA = data.detailedInTabData;
            this.DETAILED_IN_CHORD_DATA = data.detailedInChordData;

            this.DETAILED_IN_BARCHART_DATA = data.detailedInBarChartData;
            this.isLoading = false;
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
            this.$refs.DETAILED_CHORD_IN_SY.resetHiddenArchState();
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
            return SingleYearSearchService.getDetailedInSelectionText(this.DETAILED_IN_MAP_CURRENT_SELECTION)
        },
        getDetailedOutSelectionText() {
            return SingleYearSearchService.getDetailedOutSelectionText(this.DETAILED_OUT_MAP_CURRENT_SELECTION)
        },
        getLocaleStringValue(val) {
            return val ? val.toLocaleString() : null;
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margin-10-tb {
    margin: 10px 0px
}

.margin-10-b {
    margin-bottom: 10px;
}

.my-card-content {
    padding: 1rem;
}

.info-section {
    background: rgb(230, 230, 230);
    border-radius: 5px;
}

.selected-region-section {
    display: flex
}

.auto-margin-left {
    margin-left: auto
}
</style>
