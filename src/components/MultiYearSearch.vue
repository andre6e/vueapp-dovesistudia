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
                <p class="heading">Studenti immatricolati</p>
                <p class="title"> {{totalNumber}} </p> 
            </div>
        </section>
    
        <section>
            <TrendLineComponent :chart-data="TRENDLINE_DATA" :chart-config="TRENDLINE_CONF" :chart-id="GLOBAL_TRAND_ISCRITTI_CHART_ID"/>
        </section>
       
        <section>
            <SortedBarChartComponent :chart-data="SORTED_BARCHART_DATA" :chart-config="SORTED_BARCHART_CONFIG" chart-id="sdasd"/>
        </section>
    </div>
</template>

<script>

import * as MultiYearSearchService from '../services/MultiYearSearchService.js'
import TrendLineComponent from './TrendLineComponent.vue'
import SortedBarChartComponent from './SortedBarChartComponent.vue'

import {
    ACCADEMIC_YEARS_MULTI, 
    GLOBAL_TRAND_ISCRITTI_CHART_ID
} from '../constants/constants';

import { TRENDLINE_DATA, TRENDLINE_CONF } from '../data/trendline_mock'
import { SORTED_BARCHART_DATA, SORTED_BARCHART_CONFIG } from '../data/sortedbarchart_mock'

export default {
    name: 'MultiYearSearch',
    components: {
        TrendLineComponent,
        SortedBarChartComponent
    },
    data: function() {
        return {
            // isGeneralStatisticSingleYearSearchOpen: true,
            isLoading: true,
            ACCADEMIC_YEARS: ACCADEMIC_YEARS_MULTI,
            SELECTED_YEARS: [2010, 2019],
            TRENDLINE_DATA,
            TRENDLINE_CONF,
            GLOBAL_TRAND_ISCRITTI_CHART_ID,
            SORTED_BARCHART_DATA,
            SORTED_BARCHART_CONFIG,
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
                console.log(data)
                that.isLoading = false;
                that.totalNumber = data.totalNumber;
            }).catch(function (err) {
                console.log(err)
            });
        },
        onSelectionChange(selection) {
            if (selection[1] - selection[0] == 0) {
                console.log("seleziona meglio l'anno")
            } else {
                var data = MultiYearSearchService.getMultiYearData(selection);
                this.totalNumber = data.totalNumber;
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

.info-section {
    background: rgb(230, 230, 230);
    border-radius: 5px;
}
</style>
