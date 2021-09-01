import * as d3 from "d3";

import { 
    CSV_KEYS,
    ACCADEMIC_YEARS,
    ACCADEMIC_YEARS_MULTI_MIN,
    ACCADEMIC_YEARS_MULTI_MAX,
    TRANDLINE_KEY_FIELD,
    TRANDLINE_VALUE_FIELD,
    TOOLTIP_TOOLTIP_FIELD,
    BARCHART_Y_AXES,
    BARCHART_X_AXES,
    TOP_N_REGIONS,
    OUT_MODE,
    IN_MODE
} from '../constants/constants';

var DATA = {}

// HELPERS
// var sortStudentsDescending = function(arr) {
//     return arr.sort(function (a, b) {
//         if (b.students > a.students) return -1;
//         else if (a.students > b.students) return 1;
//         else return 0;
//     });
// };

var sortStudentsAscending = function(arr) {
    return arr.sort(function (a, b) {
        if (a.students > b.students) return 1;
        else if (b.students > a.students) return -1;
        else return 0;
    });
};

var getFirstNElementsFromArray = function(arr, N) {
    return arr.slice(0, N);
}

// ELABORATORS

var elabRawData = function(data) {
    for (var i = 0; i<data.length; i++) {
        var key = data[i][0][CSV_KEYS.ANNO];

        DATA[key] = data[i]
    }
};

var elabTotalIscritti = function (filteredData) {
    return d3.sum(filteredData, d =>  d[CSV_KEYS.ISCRITTI]);
};

var elabSingleTrandChartData = function (filteredData) {
    var toReturn = [];
    var students_map =  d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.ANNO]);

    students_map.forEach(function (value, key) {
        var year_obj = {};

        year_obj[TRANDLINE_KEY_FIELD] = key.split('/')[0]
        year_obj[TRANDLINE_VALUE_FIELD] = value;
        year_obj[TOOLTIP_TOOLTIP_FIELD] = key
        toReturn.push(year_obj)
    });

    return toReturn;
};

var elabBarChartData = function (filteredData, mode) {
    var toReturn = [];

    var students_map = null;

    if (mode == OUT_MODE) {
        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM]);
    } else {
        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO]);
    }

  
    // var outgoing_students = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM]);

    students_map.forEach(function (value, key) {
        var obj = {};

        obj[BARCHART_X_AXES] = key;
        obj[BARCHART_Y_AXES] = value;
        toReturn.push(obj);
    });

    var ascendingList = sortStudentsAscending(toReturn);
    var descendingList = ascendingList.slice().reverse();

    return {
        ascendingData: getFirstNElementsFromArray(ascendingList, TOP_N_REGIONS),
        descendingData: getFirstNElementsFromArray(descendingList, TOP_N_REGIONS)
    }
};

// LOADER

var loadMultiYearData = function(filteredData) {
    return {
        totalNumber: elabTotalIscritti(filteredData),
        singleTrandChartData: elabSingleTrandChartData(filteredData),
        outBarChartData: elabBarChartData(filteredData, OUT_MODE),
        inBarChartData: elabBarChartData(filteredData, IN_MODE),
    }
}

// API
export function getMultiYearData(selection) {
    var min = "" + selection[0];
    let diff = selection[1] - selection[0];

    var filteredData = [];

    for (var i=0; i<=diff; i++) {
        let key_to_read = min + "/" + (parseInt(min) + 1);
        min = "" + (parseInt(min) + 1);
        filteredData = filteredData.concat(DATA[key_to_read]);
    }

    return loadMultiYearData(filteredData);
}

export async function loadAllData() {
    var promises = [];

    for (var i=0; i<ACCADEMIC_YEARS.length; i++) {
        promises.push(d3.csv('dataset/' + ACCADEMIC_YEARS[i] + ".csv"));
    }

    var data = await Promise.all(promises);
    elabRawData(data);
    return getMultiYearData([ACCADEMIC_YEARS_MULTI_MIN, ACCADEMIC_YEARS_MULTI_MAX]);
}

