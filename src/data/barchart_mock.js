export var BARCHART_DATA = [{
    "degree": "LM",
    "students": 2025
    }, {
    "degree": "LT",
    "students": 1882
    }, {
    "degree": "CU",
    "students": 1809
}, ];

export var BARCHART_DATA2 = [{
    "degree": "LM",
    "students": 2025
    }, {
    "degree": "LT",
    "students": 1882
    }];

export var BARCHART_OPTIONS = {
    xaxes_name: 'degree',
    yaxes_name: 'students',
    series: {
        tooltipText: "{categoryX}: [bold]{valueY}[/]",
        fillOpacity: .8
    },
    columnTemplate: {
        strokeWidth: 2,
        strokeOpacity: 1
    }
};