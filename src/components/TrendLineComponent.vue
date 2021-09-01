<template>
    <section class="section">
        <div class="trendlinediv" :id="chartId"> </div>
    </section>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
    name: 'TrendLineComponent',
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
            let chart = am4core.create(this.chartId, am4charts.XYChart);

            // Disable chart cursor
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineX.disabled = true;
            chart.cursor.lineY.disabled = true;
            chart.cursor.behavior = "none";

            // Add data
            chart.data = this.chartData

            // Create axes
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = this.chartConfig.dateAxis.location;
            dateAxis.renderer.minGridDistance = this.chartConfig.dateAxis.minGridDistance;

            chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            var series = chart.series.push(new am4charts.LineSeries());
            series.tooltipText = this.chartConfig.series.tooltipText;
            series.dataFields.valueY = this.chartConfig.series.valueY;
            series.dataFields.dateX = this.chartConfig.series.dateX;
            
            series.bullets.push(new am4charts.CircleBullet());
            
            chart.logo.disabled = true;
            
            this.chart = chart
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
.trendlinediv {
    width: 100%;
    height: 300px;
}
</style>