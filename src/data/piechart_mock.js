export var PIECHART_DATA = [ {
    "country": "Lithuania",
    "litres": 501.9,
    "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }, {
    "country": "Czechia",
    "litres": 301.9,
    "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }, {
    "country": "Ireland",
    "litres": 201.1,
    "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }, {
    "country": "Germany",
    "litres": 165.8,
    "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }, {
    "country": "Australia",
    "litres": 139.9,
    "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }, {
    "country": "Austria",
    "litres": 128.3,
    "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }, {
    "country": "UK",
    "litres": 99,
    "subData": [{ name: "A", value: 90 }, { name: "B", value: 40 }, { name: "C", value: 10 }]
    }
];

export var PIECHART_CONF = {
    pieSeries: {
        value: "litres",
        category: "country",
        strokeOpacity: 1,
        opacity: 1,
        endAngle: -90,
        startAngle: -90
    }
};