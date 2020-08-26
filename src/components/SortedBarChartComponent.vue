<template>
    <section class="section">
        <div class="chartdiv" :id="chartId"> </div>
    </section>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
    name: 'SortedBarChartComponent',
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
            chart.padding(40, 40, 40, 40);

            let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = this.chartConfig.categoryAxis.location;
            categoryAxis.dataFields.category = this.chartConfig.x_axes;
            categoryAxis.renderer.minGridDistance = this.chartConfig.categoryAxis.minGridDistance;
            categoryAxis.renderer.inversed = this.chartConfig.categoryAxis.inversed;
            categoryAxis.renderer.grid.template.disabled = this.chartConfig.categoryAxis.template_disabled;

            let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;

            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryY = this.chartConfig.x_axes;
            series.dataFields.valueX = this.chartConfig.y_axes;
            series.tooltipText = this.chartConfig.series.tooltipText
            series.columns.template.strokeOpacity = this.chartConfig.series.strokeOpacity;
            series.columns.template.column.cornerRadiusBottomRight = this.chartConfig.series.cornerRadiusBottomRight;
            series.columns.template.column.cornerRadiusTopRight = this.chartConfig.series.cornerRadiusTopRight;

            let labelBullet = series.bullets.push(new am4charts.LabelBullet())
            labelBullet.label.horizontalCenter = this.chartConfig.labelBullet.horizontalCenter;
            labelBullet.label.dx = this.chartConfig.labelBullet.dx;
            labelBullet.label.text = this.chartConfig.labelBullet.text;
            labelBullet.locationX = this.chartConfig.labelBullet.locationX;

            // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
            series.columns.template.adapter.add("fill", function(fill, target){
                return chart.colors.getIndex(target.dataItem.index);
            });

            categoryAxis.sortBySeries = series;
            chart.data = this.chartData;

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
.chartdiv {
    width: 100%;
    height: 400px;
}
</style>