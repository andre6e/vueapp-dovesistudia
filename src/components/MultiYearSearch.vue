<template>
    <div class="container is-fluid">

        <!-- LOADING GIF -->
        <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
        
        <!-- SLIDER -->
        <section>
            <div class="has-text-centered">
                <b-field label="Selezione anni accademici"></b-field>
            </div>

            <div>
                <b-field>
                    <b-slider v-model="SELECTED_YEARS" :min="ACCADEMIC_YEARS[0]" :max="ACCADEMIC_YEARS[ACCADEMIC_YEARS.length - 1]" ticks @change="onSelectionChange" :custom-formatter="formatSliderTooltipText">
                    <template v-for="val in ACCADEMIC_YEARS">
                        <b-slider-tick :value="val" :key="val"> {{val}} </b-slider-tick>
                    </template>
                    </b-slider>
                </b-field>
            </div>
        </section>

        <section>
            <div v-if="!isLoading" class="has-text-centered margin-10-tb">
                <p class="heading">Studenti iscritti</p>
                <p class="title"> {{getLocaleStringValue(totalNumber)}} </p> 
            </div>
        </section>

        <!-- GENERAL STATISTICS -->
        <section>
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isGeneralStatisticsOpen">
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
                    <div>
                        <p class=" has-text-centered"> Trend studenti iscritti </p>
                        <TrendLineComponent :v-if="TRENDLINE_DATA" :chart-data="TRENDLINE_DATA" :chart-config="TRENDLINE_CONF" :chart-id="GLOBAL_TRAND_ISCRITTI_CHART_ID"/>
                    </div>

                    <div class="has-text-centered">
                        <p> Top {{TOP_N_REGIONS}} regioni in base al numero di studenti che partono dalla propria regione di residenza </p>
                        <b-field>
                            <b-switch v-model="isOutgoingSwitchOn"
                                @input="outGoingSwitchChanged"
                                :true-value="MAGGIOR_NUMERO_SWITCH_TEXT"
                                :false-value="MINOR_NUMERO_SWITCH_TEXT">
                                {{ isOutgoingSwitchOn }}
                            </b-switch>
                        </b-field>
                    </div>
                    
                    <div class="columns">
                        <div class="column is-two-third">
                            <HorizontalBarChartComponent :chart-data="HORIZONTAL_OUT_BARCHART_DATA" :chart-config="HORIZONTAL_BARCHART_CONFIG" :chart-id="HORIZONTAL_BARCHART_OUT_ID"/>
                        </div>

                        <div class="column is-one-third">
                            <p class="has-text-centered"> Verso dove si sono spostati? </p>
                            <PieChartComponent :chart-data="OUT_PIECHART_DATA" :chart-config="PIECHART_CONF" :chart-id="PIECHART_OUT_ID"/>
                        </div>
                    </div>

                    <div class="has-text-centered">            
                        <p> Top {{TOP_N_REGIONS}} regioni in base al numero di studenti in arrivo nelle regioni dell'Ateneo scelto </p>
                        <b-field>
                            <b-switch v-model="isIncomingSwitchOn"
                                @input="incomingSwitchChanged"
                                :true-value="MAGGIOR_NUMERO_SWITCH_TEXT"
                                :false-value="MINOR_NUMERO_SWITCH_TEXT">
                                {{ isIncomingSwitchOn }}
                            </b-switch>
                        </b-field>
                    </div>
        
                    <div class="columns">
                        <div class="column is-two-third">   
                            <HorizontalBarChartComponent :chart-data="HORIZONTAL_IN_BARCHART_DATA" :chart-config="HORIZONTAL_BARCHART_CONFIG" :chart-id="HORIZONTAL_BARCHART_IN_ID"/>
                        </div>

                        <div class="column is-one-third">
                            <p class="has-text-centered"> Da dove sono arrivati? </p>
                            <PieChartComponent :chart-data="IN_PIECHART_DATA" :chart-config="PIECHART_CONF" :chart-id="PIECHART_IN_ID"/>
                        </div>
                    </div>
                </div>
            </b-collapse>
        </section>
        
        <!-- SINGLE REGION TRENDS -->
        <section class="margin-10-tb">
            <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" v-model="isSingleRegionStatisticOpen">
                <div
                    slot="trigger" 
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3"
                   >
                    <p class="card-header-title">
                        Trand studenti in uscita vs in arrivo
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>

                <div class="has-text-centered margin-10-tb">
                    
                        <b-select class="has-text-centered" placeholder="Seleziona una regione" @change.native="onRegionSelection()" v-model="selectedRegion">
                            <option
                                v-for="region in REGIONS_LIST"
                                :value="region"
                                :key="region"
                                >
                                {{ region }}
                            </option>
                        </b-select>
                    
                </div>
                
                <div v-if="selectedRegion">
                    <b-field class="has-text-centered">
                        <b-switch v-model="isRegionNsrSwitchOn"
                            @input="regionFocusSnrClicked"
                            :true-value="INCLUDI_SNR_STUDENTS"
                            :false-value="ESCLUDI_SNR_STUDENTS">
                            {{ isRegionNsrSwitchOn }}
                        </b-switch>
                    </b-field>

                    <TrendLineComponent :v-if="DOUBLE_TRENDLINE_DATA" :chart-data="DOUBLE_TRENDLINE_DATA" :chart-config="DOUBLE_TRENDLINE_CONF" :chart-id="DOUBLE_TRAND_ISCRITTI_CHART_ID"/>    
                </div>
            </b-collapse>
        </section>
    </div>
</template>

<script>

import * as MultiYearSearchService from '../services/MultiYearSearchService.js'
import TrendLineComponent from './TrendLineComponent.vue'
import HorizontalBarChartComponent from './HorizontalBarChartComponent.vue'
import PieChartComponent from './PieChartComponent.vue'

import {
    ACCADEMIC_YEARS_MULTI, 
    GLOBAL_TRAND_ISCRITTI_CHART_ID,
    TRENDLINE_CONF,
    DOUBLE_TRENDLINE_CONF,
    MAGGIOR_NUMERO_SWITCH_TEXT,
    MINOR_NUMERO_SWITCH_TEXT,
    HORIZONTAL_BARCHART_CONFIG,
    HORIZONTAL_BARCHART_OUT_ID,
    HORIZONTAL_BARCHART_IN_ID,
    TOP_N_REGIONS,
    PIECHART_CONF,
    PIECHART_OUT_ID,
    PIECHART_IN_ID,
    DOUBLE_TRAND_ISCRITTI_CHART_ID,
    REGIONS_LIST,
    ESCLUDI_SNR_STUDENTS,
    INCLUDI_SNR_STUDENTS,
    DEFAULT_DOUBLE_TREND_SELECTED_REGION
} from '../constants/constants';

export default {
    name: 'MultiYearSearch',
    components: {
        TrendLineComponent,
        HorizontalBarChartComponent,
        PieChartComponent
    },
    data: function() {
        return {
            isLoading: true,
            MAGGIOR_NUMERO_SWITCH_TEXT,
            MINOR_NUMERO_SWITCH_TEXT,
            ESCLUDI_SNR_STUDENTS,
            INCLUDI_SNR_STUDENTS,
            isOutgoingSwitchOn: MAGGIOR_NUMERO_SWITCH_TEXT,
            isIncomingSwitchOn: MAGGIOR_NUMERO_SWITCH_TEXT,
            isRegionNsrSwitchOn: INCLUDI_SNR_STUDENTS,
            ACCADEMIC_YEARS: ACCADEMIC_YEARS_MULTI,
            SELECTED_YEARS: [2010, 2019],
            TRENDLINE_DATA: null,
            DOUBLE_TRENDLINE_DATA: null,
            TRENDLINE_CONF,
            DOUBLE_TRENDLINE_CONF,
            GLOBAL_TRAND_ISCRITTI_CHART_ID,
            DOUBLE_TRAND_ISCRITTI_CHART_ID,
            HORIZONTAL_OUT_BARCHART_DATA: null,
            HORIZONTAL_IN_BARCHART_DATA: null,
            HORIZONTAL_BARCHART_CONFIG,
            TOP_N_REGIONS,
            HORIZONTAL_BARCHART_OUT_DATA_COPY: null,
            HORIZONTAL_BARCHART_IN_DATA_COPY: null,
            HORIZONTAL_BARCHART_OUT_ID,
            HORIZONTAL_BARCHART_IN_ID,
            totalNumber: 0,
            OUT_PIECHART_DATA: null,
            OUT_PIECHART_DATA_COPY: null,
            PIECHART_CONF,
            PIECHART_OUT_ID,
            PIECHART_IN_ID,
            IN_PIECHART_DATA: null,
            IN_PIECHART_DATA_COPY: null,
            selectedRegion: DEFAULT_DOUBLE_TREND_SELECTED_REGION,
            REGIONS_LIST: REGIONS_LIST,
            DOUBLE_TRENDLINE_DATA_COPY: null,
            isGeneralStatisticsOpen: true,
            isSingleRegionStatisticOpen: true
        }
    },
    mounted: function() {
        this.initializeSingleYearSearch();
    },
    methods: {
        initializeSingleYearSearch() {
            var that = this;

            MultiYearSearchService.loadAllData().then(function (data) {
                console.log("MULTIYEAR SEARCH RECEIVED ELAB DATA", data);
                that.isLoading = false;
                that.totalNumber = data.totalNumber;
                that.TRENDLINE_DATA = data.singleTrandChartData;

                that.HORIZONTAL_BARCHART_OUT_DATA_COPY = data.outBarChartData;
                that.HORIZONTAL_BARCHART_IN_DATA_COPY = data.inBarChartData;

                that.HORIZONTAL_OUT_BARCHART_DATA = that.isOutgoingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.outBarChartData.descendingData : data.outBarChartData.ascendingData
                that.HORIZONTAL_IN_BARCHART_DATA = that.isIncomingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.inBarChartData.descendingData : data.inBarChartData.ascendingData

                that.OUT_PIECHART_DATA_COPY = data.pieChartData.out;
                that.OUT_PIECHART_DATA = that.isOutgoingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.pieChartData.out.descendingPieChartData : data.pieChartData.out.ascendingPieChartData
                
                that.IN_PIECHART_DATA_COPY = data.pieChartData.in;
                that.IN_PIECHART_DATA = that.isIncomingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.pieChartData.in.descendingPieChartData : data.pieChartData.in.ascendingPieChartData

                that.DOUBLE_TRENDLINE_DATA_COPY = data.doubleTrandLineData;
                that.DOUBLE_TRENDLINE_DATA = that.isRegionNsrSwitchOn == ESCLUDI_SNR_STUDENTS ? data.doubleTrandLineData.nsrData : data.doubleTrandLineData.fullData
            }).catch(function (err) {
                console.log(err)
            });
        },
        onSelectionChange(selection) {
            if (selection[1] - selection[0] == 0) {
                console.log("seleziona meglio l'anno")
            } else {
                var data = MultiYearSearchService.getMultiYearData(selection);
                console.log("MULTIYEAR SEARCH RECEIVED ELAB DATA", data);
                this.totalNumber = data.totalNumber;
                this.TRENDLINE_DATA = data.singleTrandChartData;

                this.HORIZONTAL_BARCHART_OUT_DATA_COPY = data.outBarChartData;
                this.HORIZONTAL_BARCHART_IN_DATA_COPY = data.inBarChartData;

                this.HORIZONTAL_OUT_BARCHART_DATA = this.isOutgoingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.outBarChartData.descendingData : data.outBarChartData.ascendingData;
                this.HORIZONTAL_IN_BARCHART_DATA = this.isIncomingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.inBarChartData.descendingData : data.inBarChartData.ascendingData;

                this.OUT_PIECHART_DATA_COPY = data.pieChartData.out;
                this.OUT_PIECHART_DATA = this.isOutgoingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.pieChartData.out.descendingPieChartData : data.pieChartData.out.ascendingPieChartData

                this.IN_PIECHART_DATA_COPY = data.pieChartData.in;
                this.IN_PIECHART_DATA = this.isIncomingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? data.pieChartData.in.descendingPieChartData : data.pieChartData.in.ascendingPieChartData
                
                this.DOUBLE_TRENDLINE_DATA_COPY = data.doubleTrandLineData;
                this.DOUBLE_TRENDLINE_DATA = this.isRegionNsrSwitchOn == ESCLUDI_SNR_STUDENTS ? data.doubleTrandLineData.nsrData : data.doubleTrandLineData.fullData
            }
        },
        outGoingSwitchChanged(e) {
            this.HORIZONTAL_OUT_BARCHART_DATA = e == MAGGIOR_NUMERO_SWITCH_TEXT ? this.HORIZONTAL_BARCHART_OUT_DATA_COPY.descendingData : this.HORIZONTAL_BARCHART_OUT_DATA_COPY.ascendingData;
            this.OUT_PIECHART_DATA = this.isOutgoingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? this.OUT_PIECHART_DATA_COPY.descendingPieChartData : this.OUT_PIECHART_DATA_COPY.ascendingPieChartData;
        },
        incomingSwitchChanged(e) {
            this.HORIZONTAL_IN_BARCHART_DATA = e == MAGGIOR_NUMERO_SWITCH_TEXT ? this.HORIZONTAL_BARCHART_IN_DATA_COPY.descendingData : this.HORIZONTAL_BARCHART_IN_DATA_COPY.ascendingData
            this.IN_PIECHART_DATA = this.isIncomingSwitchOn == MAGGIOR_NUMERO_SWITCH_TEXT ? this.IN_PIECHART_DATA_COPY.descendingPieChartData : this.IN_PIECHART_DATA_COPY.ascendingPieChartData
        },
        onRegionSelection() {
            if (this.selectedRegion) {
                var data = MultiYearSearchService.getRegionDoubleTrandLineData(this.selectedRegion);
                this.DOUBLE_TRENDLINE_DATA_COPY = data;
                console.log(data)
                this.DOUBLE_TRENDLINE_DATA = this.isRegionNsrSwitchOn == ESCLUDI_SNR_STUDENTS ? data.nsrData : data.fullData
            }
        },
        regionFocusSnrClicked(e) {
            this.DOUBLE_TRENDLINE_DATA = e == ESCLUDI_SNR_STUDENTS ? this.DOUBLE_TRENDLINE_DATA_COPY.nsrData : this.DOUBLE_TRENDLINE_DATA_COPY.fullData
        },
        getLocaleStringValue(val) {
            return MultiYearSearchService.getLocaleStringValue(val)
        },
        formatSliderTooltipText(val) {
            return MultiYearSearchService.formatSliderTooltipText(val)
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

.info-section {
    background: rgb(230, 230, 230);
    border-radius: 5px;
}
</style>
