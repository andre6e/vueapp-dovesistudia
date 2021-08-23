import * as d3 from "d3";

import { 
    CSV_KEYS,
    // tab
    TAB_CONFIG,
    OUTGOING_STUDENTS_FIELD,
    INCOMING_STUDENTS_FIELD,
    NAME_FIELD,
    // barchart
    DEGREE_FIELD,
    STUDENTS_FIELD
} from '../constants/constants';


var elabTotalIscritti = function (data) {
    return d3.sum(data, d =>  d[CSV_KEYS.ISCRITTI]);
}

var elabGeneralTabData = function (data) {
    var toReturn = {
        data: [],
        columns: TAB_CONFIG.columns
    };

    // raggruppo per regione from e poi conto
    var outgoing_students = d3.rollup(data, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
    // raggruppo per regione to e poi conto
    var incoming_students = d3.rollup(data, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO])

    outgoing_students.forEach(function (value, key) {
        var obj = {};

        obj[OUTGOING_STUDENTS_FIELD] = value;
        obj[INCOMING_STUDENTS_FIELD] = incoming_students.get(key);
        obj[NAME_FIELD] = key;

        toReturn.data.push(obj);
    })

    return toReturn;
}

var elabGenaralTypologyChart = function (data) {
    var typology = d3.rollup(data, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.CORSO])
    console.log(typology);

    var toReturn = [];

    typology.forEach(function (value, key) {
        var obj = {};

        obj[DEGREE_FIELD] = key;
        obj[STUDENTS_FIELD] = value;

        toReturn.push(obj);
    });

    return toReturn;
}

var elabGeneralChordData = function(data) {
    // serve doble grouping per ognuna delle regioni bisogna avere il numero di ognuna delle altre
    console.log(data)
}

var loadGeneralStatistics = function(data) {
    elabGeneralChordData(data)

    var elabResponse = {
        totalNumber: elabTotalIscritti(data),
        generalTabData: elabGeneralTabData(data),
        generalBarChartData: elabGenaralTypologyChart(data)
    }
    
    return elabResponse;
}

export async function getSingleYearData(year) {
    var data = await d3.csv(year + ".csv")
    return loadGeneralStatistics(data)
}