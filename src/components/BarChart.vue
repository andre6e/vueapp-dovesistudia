<template>
    <section class="section is-small">
        <div class="container">
            <div class="chartdiv" id="barchartglobaldiv">
            </div>
        </div>
    </section>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
    name: 'BarChart',
    props: {
        chartData: {
            type: Array,
            default: () => ([])
        },
        chartConfig: {
            type: Object,
            default: () => ({})
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
            let chart = am4core.create("barchartglobaldiv", am4charts.XYChart);

            // Add data
            chart.data = this.chartData;

            // Create axes
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = this.chartConfig.xaxes_name;
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;

            categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }

                return dy;
            });

            chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = this.chartConfig.yaxes_name;
            series.dataFields.categoryX = this.chartConfig.xaxes_name;
            series.name = this.chartConfig.yaxes_name;

            series.columns.template.tooltipText = this.chartConfig.series.tooltipText;
            series.columns.template.fillOpacity = this.chartConfig.series.fillOpacity;

            let columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = this.chartConfig.columnTemplate.strokeWidth;
            columnTemplate.strokeOpacity = this.chartConfig.columnTemplate.strokeOpacity;

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
.chartdiv {
    width: 100%;
    height: 350px;
}
</style>