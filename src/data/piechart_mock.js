export var PIECHART_DATA = [ {
    "region": "Lithuania",
    "students": 501.9
    }, {
    "region": "Czechia",
    "students": 301.9
    }, {
    "region": "Ireland",
    "students": 201.1
    }, {
    "region": "Germany",
    "students": 165.8
    }, {
    "region": "Australia",
    "students": 139.9
    }, {
    "region": "Austria",
    "students": 128.3
    }, {
    "region": "UK",
    "students": 99
    }
];

export var PIECHART_CONF = {
    pieSeries: {
        value: "students",
        category: "region",
        strokeOpacity: 1,
        opacity: 1,
        endAngle: -90,
        startAngle: -90
    }
};