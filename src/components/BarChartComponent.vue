<template>
    <div class="chartdiv min-height" v-bind:class="{ 'full-height': chartHeight == 'full', 'fixed-height' : chartHeight != 'full'}" :id="chartId"> </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
    name: 'BarChartComponent',
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
        },
        chartHeight: {
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

            // Add data
            chart.data = this.chartData;

            // Create axes
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = this.chartConfig.xaxes_name;
            categoryAxis.renderer.grid.template.location = 0;
            // categoryAxis.renderer.minGridDistance = 30;
            //categoryAxis.renderer.inside = true;
            // categoryAxis.renderer.labels.template.valign = "top";
            // categoryAxis.renderer.labels.template.fontSize = 10;
            categoryAxis.hidden = true

            categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
                if (target.dataItem && target.dataItem.index & 2 == 2) {
                    return dy + 25;
                }

                return dy;
            });

            chart.yAxes.push(new am4charts.ValueAxis());

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());  
            series.columns.template.width = am4core.percent(50);
   

            series.columns.template.adapter.add("fill", function(fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            })

            series.dataFields.valueY = this.chartConfig.yaxes_name;
            series.dataFields.categoryX = this.chartConfig.xaxes_name;
            series.name = this.chartConfig.yaxes_name;

            series.columns.template.tooltipText = this.chartConfig.series.tooltipText;
            series.columns.template.fillOpacity = this.chartConfig.series.fillOpacity;

            let columnTemplate = series.columns.template;
            columnTemplate.strokeWidth = this.chartConfig.columnTemplate.strokeWidth;
            columnTemplate.strokeOpacity = this.chartConfig.columnTemplate.strokeOpacity;

            chart.logo.disabled = true;

            // var legend = new am4charts.Legend();
            // legend.parent = chart.chartContainer;
            // legend.itemContainers.template.togglable = false;
            // legend.marginTop = 20;

            var legend = new am4charts.Legend();
            chart.legend = legend;
            legend.itemContainers.template.togglable = false;




    

          series.events.on("ready", function() {
            var legenddata = [];
            series.columns.each(function(column) {
                legenddata.push({
                name: column.dataItem.categoryX,
                fill: column.fill
                });
            });
            legend.data = legenddata;
        });



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
}

.full-height {
    height: 90%;
}

.fixed-height {
    height: 300px;
}

.min-height {
    min-height: 300px;
}

</style>