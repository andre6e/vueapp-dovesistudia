import * as d3 from "d3";

import { 
    CSV_KEYS,
    ACCADEMIC_YEARS,
    ACCADEMIC_YEARS_MULTI_MIN,
    ACCADEMIC_YEARS_MULTI_MAX,
    TRANDLINE_KEY_FIELD,
    TRANDLINE_VALUE_FIELD,
    TOOLTIP_TOOLTIP_FIELD,
    TRANDLINE_KEY_FIELD2,
    TRANDLINE_VALUE_FIELD2,
    BARCHART_Y_AXES,
    BARCHART_X_AXES,
    TOP_N_REGIONS,
    OUT_MODE,
    IN_MODE,
    PIECHART_VALUE_FIELD,
    PIECHART_CATEGORY_FIELD,
    DEFAULT_DOUBLE_TREND_SELECTED_REGION
} from '../constants/constants';

var DATA = {}
var FILTERED_DATA = []

// HELPERS

var sortStudentsAscending = function(arr) {
    return arr.sort(function (a, b) {
        if (a.students > b.students) return 1;
        else if (b.students > a.students) return -1;
        else return 0;
    });
};

var getFirstNElementsFromArray = function(arr, N) {
    return arr.slice(0, N);
};

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

var safeElabPieChartData = function(filteredData, outBarChartData, inBarchartData) {
    var outAscendingPieChartData = elabPieChartData(filteredData, outBarChartData.ascendingData, OUT_MODE);
    var outDescendingPieChartData = elabPieChartData(filteredData, outBarChartData.descendingData, OUT_MODE);

    var inAscendingPieChartData = elabPieChartData(filteredData, inBarchartData.ascendingData, IN_MODE);
    var inDescendingPieChartData = elabPieChartData(filteredData, inBarchartData.descendingData, IN_MODE);

    return {
        out: {
            ascendingPieChartData: outAscendingPieChartData,
            descendingPieChartData: outDescendingPieChartData,
        },
        in: {
            ascendingPieChartData: inAscendingPieChartData,
            descendingPieChartData: inDescendingPieChartData
        }
    }
};

var elabPieChartData = function(filteredData, regions_list, mode) {
    // var filteredData = filteredData;
    var students_map = null;
    regions_list = regions_list.map(d => d.regione);

    if (mode == OUT_MODE) {
        // OUTGOING
        filteredData = filteredData.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_FROM])});
        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO])
    } else {
        // INCOMING
        filteredData = filteredData.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_TO])});
        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO], d => d[CSV_KEYS.REGIONE_FROM])
    }
    
    var SAME_GRAND_TOTAL = 0;
    var OTHER_GRAND_TOTAL = 0;

    students_map.forEach(function (value, key) {
        var same_region = value.get(key);
        var other_regions = 0;

        value.forEach(function (subValue, subKey) {
            if (key != subKey) {
                other_regions += subValue
            }
        });

        SAME_GRAND_TOTAL += same_region;
        OTHER_GRAND_TOTAL += other_regions;
    });

    var same_obj = {}
    same_obj[PIECHART_CATEGORY_FIELD] = "Stessa regione"
    same_obj[PIECHART_VALUE_FIELD] = SAME_GRAND_TOTAL
    
    var other_obj = {}
    other_obj[PIECHART_CATEGORY_FIELD] = "Altre regioni"
    other_obj[PIECHART_VALUE_FIELD] = OTHER_GRAND_TOTAL

    return [same_obj, other_obj]
};

var elabRegionDoubleTrandLineData = function (region) {
    var toReturn = [];
    var nsrToReturn = [];

    // Dati completi
    var filteredDataOut = FILTERED_DATA.filter(function (d) { return d[CSV_KEYS.REGIONE_FROM] == region});
    var filteredDataIn = FILTERED_DATA.filter(function (d) { return d[CSV_KEYS.REGIONE_TO] == region});
    var students_map_out =  d3.rollup(filteredDataOut, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.ANNO]);
    var students_map_in =  d3.rollup(filteredDataIn, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.ANNO]);
    
    students_map_out.forEach(function (value, key) {
        var year_obj = {};
        
        year_obj[TRANDLINE_KEY_FIELD] = key.split('/')[0]
        year_obj[TRANDLINE_VALUE_FIELD] = value;
        year_obj[TOOLTIP_TOOLTIP_FIELD] = key
        
        year_obj[TRANDLINE_KEY_FIELD2] = key.split('/')[0]
        year_obj[TRANDLINE_VALUE_FIELD2] = students_map_in.get(key);
        toReturn.push(year_obj)
    });
    
    // NO SAME REGION (escludo quelli che si muovono all'interno della stessa regione)
    var filteredDataNoSameRegion = FILTERED_DATA.filter(function (d) { return d[CSV_KEYS.REGIONE_FROM] != d[CSV_KEYS.REGIONE_TO]});
    var filteredDataOutNSR = filteredDataNoSameRegion.filter(function (d) { return d[CSV_KEYS.REGIONE_FROM] == region});
    var filteredDataInNSR = filteredDataNoSameRegion.filter(function (d) { return d[CSV_KEYS.REGIONE_TO] == region});
    var students_map_out_NSR =  d3.rollup(filteredDataOutNSR, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.ANNO]);
    var students_map_in_NSR =  d3.rollup(filteredDataInNSR, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.ANNO]);
    
    students_map_out_NSR.forEach(function (value, key) {
        var year_obj = {};

        year_obj[TRANDLINE_KEY_FIELD] = key.split('/')[0]
        year_obj[TRANDLINE_VALUE_FIELD] = value;
        year_obj[TOOLTIP_TOOLTIP_FIELD] = key

        year_obj[TRANDLINE_KEY_FIELD2] = key.split('/')[0]
        year_obj[TRANDLINE_VALUE_FIELD2] = students_map_in_NSR.get(key);
        nsrToReturn.push(year_obj)
    });

    return {
        fullData: toReturn,
        nsrData: nsrToReturn
    }
};

// LOADER

var loadMultiYearData = function() {
    var outBarChartData = elabBarChartData(FILTERED_DATA, OUT_MODE);
    var inBarchartData = elabBarChartData(FILTERED_DATA, IN_MODE);
    
    return {
        totalNumber: elabTotalIscritti(FILTERED_DATA),
        singleTrandChartData: elabSingleTrandChartData(FILTERED_DATA),
        outBarChartData: outBarChartData,
        inBarChartData: inBarchartData,
        pieChartData: safeElabPieChartData(FILTERED_DATA, outBarChartData, inBarchartData),
        doubleTrandLineData: elabRegionDoubleTrandLineData(DEFAULT_DOUBLE_TREND_SELECTED_REGION)
    }
};

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

    FILTERED_DATA = filteredData;
    return loadMultiYearData();
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

export function getRegionDoubleTrandLineData(region) {
    return elabRegionDoubleTrandLineData(region);
}

export function getLocaleStringValue(val) {
    return val ? val.toLocaleString() : null;
}