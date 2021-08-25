<template>
    <section class="section">
        <div class="piechartdiv" :id="chartId"> </div>
    </section>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
    name: 'PieChartComponent',
    props: {
        chartData: {
            type: Array,
            default: () => ([])
        },
        chartConfig: {
            type: Object,
            default: () => ({})
        },
        chartId: {
            type: String
        }
    },
    mounted() {
        this.mountChart()
    },
    methods: {
        updateChartData() {
            this.chart.data = this.chartData
        },
        mountChart() {
            // Create chart instance
            let chart = am4core.create(this.chartId, am4charts.PieChart);

            // Add data
            chart.data = this.chartData;

            // Add and configure Series
            let pieSeries = chart.series.push(new am4charts.PieSeries());

            pieSeries.dataFields.value = this.chartConfig.pieSeries.value;
            pieSeries.dataFields.category = this.chartConfig.pieSeries.category;
            pieSeries.slices.template.strokeOpacity = this.chartConfig.pieSeries.strokeOpacity;
            pieSeries.slices.template.stroke = am4core.color("#fff");

            // This creates initial animation
            pieSeries.hiddenState.properties.opacity = this.chartConfig.pieSeries.opacity;
            pieSeries.hiddenState.properties.endAngle = this.chartConfig.pieSeries.endAngle;
            pieSeries.hiddenState.properties.startAngle = this.chartConfig.pieSeries.startAngle;

            chart.hiddenState.properties.radius = am4core.percent(0);
            chart.logo.disabled = true;

            this.chart = chart;
        }
    },
    watch: {
        chartData: { handler: 'updateChartData', deep: true }
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
.piechartdiv {
    width: 100%;
    height: 300px;
}
</style>