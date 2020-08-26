export var TRENDLINE_DATA = [{
    "form": "2010-2011",
    "value": 10,
    "year": "2010"
},
{
    "form": "2011-2012",
    "value": 10,
    "year": "2011"
},
{
    "form": "2012-2013",
    "value": 8,
    "year": "2012"
}, {
    "form": "2013-2014",
    "value": 10,
    "year": "2013"
},{
    "form": "2014-2015",
    "value": 12,
    "year": "2014"
}, {
    "form": "2015-2016",
    "value": 14,
    "year": "2015"
}, {
    "form": "2016-2017",
    "value": 11,
    "year": "2016"
}, {
    "form": "2017-2018",
    "value": 6,
    "year": "2017"
}, {
    "form": "2018-2019",
    "value": 7,
    "year": "2018"
}];

export var TRENDLINE_CONF = {
    dateAxis: {
        location: 0.5,
        minGridDistance: 40
    },
    series: {
        tooltipText: "{form}\n[bold font-size: 17px]studenti: {valueY}[/]",
        valueY: "value",
        dateX: "year"
    }

};