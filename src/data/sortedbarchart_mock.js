export var SORTED_BARCHART_DATA = [
    {
    "regione": "Facebook",
    "students": 2255250000
    },
    {
    "regione": "Google+",
    "students": 430000000
    },
    {
    "regione": "Instagram",
    "students": 1000000000
    }
]

export var SORTED_BARCHART_DATA2 = [
    {
    "regione": "Facebook",
    "students": 2255250000
    },
    {
    "regione": "Google+",
    "students": 430000000
    }
]

export var SORTED_BARCHART_CONFIG = {
    x_axes: 'regione',
    y_axes: 'students',
    categoryAxis: {
        location: 0,
        minGridDistance: 1,
        inversed: true,
        template_disabled: true
    },
    series: {
        tooltipText: "{valueX.value}",
        strokeOpacity: 0,
        cornerRadiusBottomRight: 5,
        cornerRadiusTopRight: 5
    },
    labelBullet: {
        horizontalCenter: "left",
        dx: 10,
        text: "{values.valueX.workingValue.formatNumber('#.0as')}",
        locationX: 1
    }
}