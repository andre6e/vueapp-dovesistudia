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
    STUDENTS_FIELD,
    // chord
    FROM_CHORD_FIELD,
    TO_CHORD_FIELD,
    VALUE_CHORD_FIELD,
    // map
    // REGIONS_LIST,
    MIN_OUT_COLOR,
    MAX_OUT_COLOR,
    MIN_INC_COLOR,
    MAX_INC_COLOR,
    AMOUNT_FIELD,
    ID_FIELD
} from '../constants/constants';

var DATA = []

var elabTotalIscritti = function () {
    return d3.sum(DATA, d =>  d[CSV_KEYS.ISCRITTI]);
}

var elabGeneralTabData = function () {
    var toReturn = {
        data: [],
        columns: TAB_CONFIG.columns
    };

    // console.log(DATA)

    // raggruppo per regione from e poi conto
    var outgoing_students = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
    // raggruppo per regione to e poi conto
    var incoming_students = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO])

    outgoing_students.forEach(function (value, key) {
        var obj = {};

        obj[OUTGOING_STUDENTS_FIELD] = value;
        obj[INCOMING_STUDENTS_FIELD] = incoming_students.get(key);
        obj[NAME_FIELD] = key;

        toReturn.data.push(obj);
    });

    return toReturn;
};

var sortTypologyDescending = function(list) {
    return list.sort(function (a, b){
        if (a.students > b.students) return -1;
        else if (b.students > a.students) return 1;
        else return 0;
    })
};

var elabGenaralTypologyChart = function () {
    var typology = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.CORSO])
    var toReturn = [];


    typology.forEach(function (value, key) {
        var obj = {};

        obj[DEGREE_FIELD] = key;
        obj[STUDENTS_FIELD] = value;

        toReturn.push(obj);
    });

    return sortTypologyDescending(toReturn);
};

var elabGeneralChordData = function() {
    var toReturn = []
    var from_to_map = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO])

    from_to_map.forEach(function (value, key) {
       value.forEach(function (subValue, subKey) {
            var obj = {}
            obj[FROM_CHORD_FIELD] = key
            obj[TO_CHORD_FIELD] = subKey
            obj[VALUE_CHORD_FIELD] = subValue

            toReturn.push(obj)
        });
    });

    return toReturn;
};

var safeElabMapData = function(outgoing_list_param, incoming_list_param, updatingDetailedView) {
    var outgoing_students = null;
    var incoming_students = null;

    if (updatingDetailedView) {
        if (outgoing_list_param != null) {
            // è l'outgoing che diventa gestore del flusso
            var outgoingFilteredData = DATA.filter(function (d) {
                return outgoing_list_param.includes(d[CSV_KEYS.REGIONE_FROM])
            });

            outgoing_students = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
            incoming_students = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO])
        } else {
            var incomingFilteredData = DATA.filter(function (d){
                return incoming_list_param.includes(d[CSV_KEYS.REGIONE_TO])
            });

            incoming_students = d3.rollup(incomingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO])
            outgoing_students = d3.rollup(incomingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
        }
    } else {
        outgoing_students = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
        incoming_students = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO])
    }

    return elabMapData(outgoing_students, incoming_students)
};

var elabMapData = function(outgoing_students, incoming_students) {
    // OUTGOING
    var toReturnOut = {}
    var OBJ_OUT_DATA = {}
    var outKeyList = []

    outgoing_students.forEach(function (value, key) {
        var obj = {};

        obj[AMOUNT_FIELD] = value;
        obj[ID_FIELD] = key;
        
        OBJ_OUT_DATA[key] = obj
        outKeyList.push(key)
    });

    toReturnOut["data"] = OBJ_OUT_DATA;
    toReturnOut["min_color"] = MIN_OUT_COLOR;
    toReturnOut["max_color"] = MAX_OUT_COLOR;
    
    
    // INCOMING
    var toReturnIn = {}
    var OBJ_IN_DATA = {}
    var inKeyList = []

    incoming_students.forEach(function (value, key) {
        var obj = {};

        obj[AMOUNT_FIELD] = value;
        obj[ID_FIELD] = key;
        
        OBJ_IN_DATA[key] = obj;
        inKeyList.push(key);
    });

    toReturnIn["data"] = OBJ_IN_DATA;
    toReturnIn["min_color"] = MIN_INC_COLOR;
    toReturnIn["max_color"] = MAX_INC_COLOR;

    return {
        outMapData: toReturnOut,
        inMapData: toReturnIn,
        outgoingList: outKeyList,
        incomingList: inKeyList
    }
}

var loadGeneralStatistics = function() {
    var mapData = safeElabMapData(null, null, false)

    var elabResponse = {
        totalNumber: elabTotalIscritti(),
        generalTabData: elabGeneralTabData(),
        generalBarChartData: elabGenaralTypologyChart(),
        generalChordData: elabGeneralChordData(),
        outMapData: mapData.outMapData,
        inMapData: mapData.inMapData
    }
    
    return elabResponse;
}

export async function getSingleYearData(year) {
    var data = await d3.csv('dataset/' + year + ".csv");
    DATA = data;
    return loadGeneralStatistics()
}

export function updateDetailedView(outgoing_list_param, incoming_list_param) {
    return safeElabMapData(outgoing_list_param, incoming_list_param, true);
}