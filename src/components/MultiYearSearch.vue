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
                    <b-slider v-model="SELECTED_YEARS" :min="ACCADEMIC_YEARS[0]" :max="ACCADEMIC_YEARS[ACCADEMIC_YEARS.length - 1]" ticks @change="onSelectionChange">
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
                <p class="title"> {{totalNumber}} </p> 
            </div>
        </section>
    
        <section>
            <p class=" has-text-centered"> Trend studenti iscritti </p>
            <TrendLineComponent :v-if="TRENDLINE_DATA" :chart-data="TRENDLINE_DATA" :chart-config="TRENDLINE_CONF" :chart-id="GLOBAL_TRAND_ISCRITTI_CHART_ID"/>
        </section>
       
        <section>
            <p class="has-text-centered"> Top {{TOP_N_REGIONS}} regioni in base agli studenti uscenti </p>
            
            <b-field class="has-text-centered">
                <b-switch v-model="isOutgoingSwitchOn"
                    @input="outGoingSwitchChanged"
                    :true-value="MAGGIOR_NUMERO_SWITCH_TEXT"
                    :false-value="MINOR_NUMERO_SWITCH_TEXT">
                    {{ isOutgoingSwitchOn }}
                </b-switch>
            </b-field>
            <HorizontalBarChartComponent :chart-data="HORIZONTAL_OUT_BARCHART_DATA" :chart-config="HORIZONTAL_BARCHART_CONFIG" :chart-id="HORIZONTAL_BARCHART_OUT_ID"/>
        </section>
        
        <section>
            <p class="has-text-centered"> Top {{TOP_N_REGIONS}} regioni in base agli studenti in arrivo </p>
            
            <b-field class="has-text-centered">
                <b-switch v-model="isIncomingSwitchOn"
                    @input="incomingSwitchChanged"
                    :true-value="MAGGIOR_NUMERO_SWITCH_TEXT"
                    :false-value="MINOR_NUMERO_SWITCH_TEXT">
                    {{ isIncomingSwitchOn }}
                </b-switch>
            </b-field>
            <HorizontalBarChartComponent :chart-data="HORIZONTAL_IN_BARCHART_DATA" :chart-config="HORIZONTAL_BARCHART_CONFIG" :chart-id="HORIZONTAL_BARCHART_IN_ID"/>
        </section>

    </div>
</template>

<script>

import * as MultiYearSearchService from '../services/MultiYearSearchService.js'
import TrendLineComponent from './TrendLineComponent.vue'
import HorizontalBarChartComponent from './HorizontalBarChartComponent.vue'

import {
    ACCADEMIC_YEARS_MULTI, 
    GLOBAL_TRAND_ISCRITTI_CHART_ID,
    TRENDLINE_CONF,
    MAGGIOR_NUMERO_SWITCH_TEXT,
    MINOR_NUMERO_SWITCH_TEXT,
    HORIZONTAL_BARCHART_CONFIG,
    HORIZONTAL_BARCHART_OUT_ID,
    HORIZONTAL_BARCHART_IN_ID,
    TOP_N_REGIONS
} from '../constants/constants';


export default {
    name: 'MultiYearSearch',
    components: {
        TrendLineComponent,
        HorizontalBarChartComponent
    },
    data: function() {
        return {
            // isGeneralStatisticSingleYearSearchOpen: true,
            isLoading: true,
            MAGGIOR_NUMERO_SWITCH_TEXT,
            MINOR_NUMERO_SWITCH_TEXT,
            isOutgoingSwitchOn: MAGGIOR_NUMERO_SWITCH_TEXT,
            isIncomingSwitchOn: MAGGIOR_NUMERO_SWITCH_TEXT,
            ACCADEMIC_YEARS: ACCADEMIC_YEARS_MULTI,
            SELECTED_YEARS: [2010, 2019],
            TRENDLINE_DATA: null,
            TRENDLINE_CONF,
            GLOBAL_TRAND_ISCRITTI_CHART_ID,
            HORIZONTAL_OUT_BARCHART_DATA: null,
            HORIZONTAL_IN_BARCHART_DATA: null,
            HORIZONTAL_BARCHART_CONFIG,
            TOP_N_REGIONS,
            HORIZONTAL_BARCHART_OUT_DATA_COPY: null,
            HORIZONTAL_BARCHART_IN_DATA_COPY: null,
            HORIZONTAL_BARCHART_OUT_ID,
            HORIZONTAL_BARCHART_IN_ID,
            totalNumber: 0
        }
    },
    mounted: function() {
        // ci sarà da controllare se al cambio tab si ripassa da qui e si fa un refresh non richiesto
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
            }
        },
        outGoingSwitchChanged(e) {
            this.HORIZONTAL_OUT_BARCHART_DATA = e == MAGGIOR_NUMERO_SWITCH_TEXT ? this.HORIZONTAL_BARCHART_OUT_DATA_COPY.descendingData : this.HORIZONTAL_BARCHART_OUT_DATA_COPY.ascendingData
        },
        incomingSwitchChanged(e) {
            this.HORIZONTAL_IN_BARCHART_DATA = e == MAGGIOR_NUMERO_SWITCH_TEXT ? this.HORIZONTAL_BARCHART_IN_DATA_COPY.descendingData : this.HORIZONTAL_BARCHART_IN_DATA_COPY.ascendingData
        },
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
