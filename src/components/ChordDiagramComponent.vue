<template>
    <div>
        <div class="has-text-centered">
            <b-button v-if="archsHidable" @click="onHideAutoArchs"> {{autoArchsHidden ? 'Attiva' : 'Disattiva'}} Auto archi </b-button>
        </div>
        <div class="chartdiv min-height" :id="chartId"> </div>
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
    name: 'ChordDiagramComponent',
    props: {
        chartData: {
            type: Object,
            default: () => ({})
        },
        chartConfig: {
            type: Object,
            default: () => ({})
        },
        chartId: {
            type: String
        },
        archsHidable: {
            type: Boolean,
            default: () => (false)
        }
    },
    data: function() {
        return {
            autoArchsHidden: false
        }
    },
    mounted() {
        this.chart = am4core.create(this.chartId, am4charts.ChordDiagram);
        this.chart.logo.disabled = true;

        this.chart.nodes.template.clickable = false;
        this.chart.nodes.template.draggable = false;

        this.updateChartData();
        this.updateChartConfig();
    },
    methods: {
        updateChartData() {
            if (this.archsHidable) {
                this.chart.data = this.autoArchsHidden ? this.chartData.noAutoArchsData : this.chartData.completeData;
            } else {
                this.chart.data = this.chartData.completeData;
            }
        },
        updateChartConfig() {
            this.chart.dataFields = this.chartConfig.dataFields;
        },
        onHideAutoArchs() {
            this.autoArchsHidden = !this.autoArchsHidden;
            this.updateChartData();
        },
        resetHiddenArchState() {
            this.autoArchsHidden = false;
        }
    },
    watch: {
        chartData: { handler: 'updateChartData', deep: true },
        chartConfig: { handler: 'updateChartConfig', deep: true }
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartdiv {
    width: 100%;
    height: 100%;
}

.min-height {
    min-height: 600px;
}
</style>