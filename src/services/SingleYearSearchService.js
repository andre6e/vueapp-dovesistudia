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
    REGIONS_LIST,
    MIN_OUT_COLOR,
    MAX_OUT_COLOR,
    MIN_INC_COLOR,
    MAX_INC_COLOR,
    AMOUNT_FIELD,
    ID_FIELD,
    // provinces tab
    //PROVINCES_REGIONS_MAP
    DETAILED_TAB_NAME_FIELD,
    DETAILED_TAB_STUDENTS_FIELD,
    DETAILED_TAB_ITEMS_FIELD,
    DETAILED_TAB_PERCENTAGE_FIELD,
    DETAILED_TAB_COLUMNS_CONFIG,
    TYPOLOGY_LEGEND
} from '../constants/constants';

var DATA = []

// HELPERS

var sortStudentsDescending = function(list) {
    return list.sort(function (a, b) {
        if (a.students > b.students) return -1;
        else if (b.students > a.students) return 1;
        else return 0;
    });
};

var getTypologyLegend = function(key) {
    return TYPOLOGY_LEGEND[key];
};

// SHARED ELAB FUNCTIONS

var elabChordData = function(outgoing_list_param) {
    // il parametro mi serve per capire se sto agendo per il chord del general o delle detailed statistics
    var completeData = [];
    var noAutoArchsData = [];

    var from_to_map = null;
    var outgoingFilteredData = [];

    if (outgoing_list_param) {
        outgoingFilteredData = DATA.filter(function (d) { return outgoing_list_param.includes(d[CSV_KEYS.REGIONE_FROM])});
    }
    
    from_to_map = d3.rollup(outgoing_list_param ? outgoingFilteredData: DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO]);

    from_to_map.forEach(function (value, key) {
        value.forEach(function (subValue, subKey) {
            var obj = {}
            obj[FROM_CHORD_FIELD] = key
            obj[TO_CHORD_FIELD] = subKey
            obj[VALUE_CHORD_FIELD] = subValue

            completeData.push(obj);

            if (key != subKey && outgoing_list_param) {
                noAutoArchsData.push(obj)
            }
        });
    });

    return {
        completeData: completeData,
        noAutoArchsData: noAutoArchsData
    };
};

// GENERAL SECTION

var elabTotalIscritti = function () {
    return d3.sum(DATA, d =>  d[CSV_KEYS.ISCRITTI]);
};

var elabGeneralTabData = function () {
    var toReturn = {
        data: [],
        columns: TAB_CONFIG.columns
    };

    var outgoing_students = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
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

// DETAILED OUT SECTION

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
        incomingList: inKeyList,
    }
};

var elabDetailedOutTabData = function(outgoing_list_param) {
    var outgoingFilteredData = outgoing_list_param ? 
        DATA.filter(function (d) { return outgoing_list_param.includes(d[CSV_KEYS.REGIONE_FROM])}) : DATA;

    // var outgoing_region_provinces = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.PROVINCIA_FROM])
    var data = []

    var from_to_map = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO]);
    var total_outgoing = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM]);

    from_to_map.forEach(function (out_regs, key) {
        var totalRegionStudents = 0;
        var REG_OBJ = {};
        var items = [];

        var GRAND_TOTAL_OUTGOING = total_outgoing.get(key);

        out_regs.forEach(function (value, subKey) {
            totalRegionStudents += value;
            var out_reg_obj = {};

            out_reg_obj[DETAILED_TAB_NAME_FIELD] = subKey;
            out_reg_obj[DETAILED_TAB_STUDENTS_FIELD] = value;
            out_reg_obj[DETAILED_TAB_PERCENTAGE_FIELD] = parseFloat((value / GRAND_TOTAL_OUTGOING) * 100).toFixed(3) + "%"
            out_reg_obj["vueKey"] = key + subKey

            items.push(out_reg_obj)
        });

        REG_OBJ[DETAILED_TAB_NAME_FIELD] = key;
        REG_OBJ[DETAILED_TAB_ITEMS_FIELD] = sortStudentsDescending(items);
        REG_OBJ[DETAILED_TAB_STUDENTS_FIELD] = totalRegionStudents;
        REG_OBJ[DETAILED_TAB_PERCENTAGE_FIELD] = "100%"

        data.push(REG_OBJ);
    });

    return {
        data: sortStudentsDescending(data),
        columns: DETAILED_TAB_COLUMNS_CONFIG
    };
};

var elabDetailedOutTypologyChart = function (outgoing_list_param) {
    var outgoingFilteredData = outgoing_list_param ? 
        DATA.filter(function (d) { return outgoing_list_param.includes(d[CSV_KEYS.REGIONE_FROM])}) : DATA;

    var typology = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.CORSO])
    var toReturn = [];

    typology.forEach(function (value, key) {
        var obj = {};

        obj[DEGREE_FIELD] = getTypologyLegend(key);
        obj[STUDENTS_FIELD] = value;

        toReturn.push(obj);
    });

    return sortStudentsDescending(toReturn);
};

var elabDetailedPercentageData = function (outgoing_list_param) {
    var outgoingFilteredData = outgoing_list_param ? 
        DATA.filter(function (d) { return outgoing_list_param.includes(d[CSV_KEYS.REGIONE_FROM])}) : DATA;

    var outgoing_students = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO])

    var SAME_GRAND_TOTAL = 0;
    var OTHER_GRAND_TOTAL = 0;

    outgoing_students.forEach(function (value, key) {
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

    return {
        samePercentage: Math.round((SAME_GRAND_TOTAL / (SAME_GRAND_TOTAL + OTHER_GRAND_TOTAL)) * 100),
        othersPercentage: Math.round((OTHER_GRAND_TOTAL / (SAME_GRAND_TOTAL + OTHER_GRAND_TOTAL)) * 100),
        sameGrandTotal: SAME_GRAND_TOTAL,
        othersGrandTotal: OTHER_GRAND_TOTAL
    }
};

// LOADERS

var loadGeneralStatistics = function() {
    var mapData = safeElabMapData(null, null, false);

    var elabResponse = {
        totalNumber: elabTotalIscritti(),
        generalTabData: elabGeneralTabData(),
        generalChordData: elabChordData(),
        detailedOutMapData: mapData.outMapData,
        inMapData: mapData.inMapData,
        detailedOutTabData: elabDetailedOutTabData(),
        detailedOutBarChartData: elabDetailedOutTypologyChart(),
        detailedOutChordData: elabChordData(REGIONS_LIST),
        detailedOutPercentage: elabDetailedPercentageData()
    }
    
    return elabResponse;
};

var loadDetailedOutStatistics = function(outgoing_list_param, incoming_list_param) {
    var mapData = safeElabMapData(outgoing_list_param, incoming_list_param, true);

    var elabResponse = {
        detailedOutTabData: elabDetailedOutTabData(outgoing_list_param),
        detailedOutBarChartData: elabDetailedOutTypologyChart(outgoing_list_param),
        detailedOutMapData: mapData.outMapData,
        inMapData: mapData.inMapData,
        detailedOutChordData: elabChordData(outgoing_list_param),
        detailedOutPercentage: elabDetailedPercentageData(outgoing_list_param)
    };
    
    return elabResponse;
};

// API
export async function getSingleYearData(year) {
    var data = await d3.csv('dataset/' + year + ".csv");
    DATA = data;
    return loadGeneralStatistics();
}

export function updateDetailedView(outgoing_list_param, incoming_list_param) {
    return loadDetailedOutStatistics(outgoing_list_param, incoming_list_param);
}


// BACKUPS


// var elabOutgoingPieChartData = function(outgoing_list_param) {
//     var outgoingFilteredData = outgoing_list_param ? 
//         DATA.filter(function (d) { return outgoing_list_param.includes(d[CSV_KEYS.REGIONE_FROM])}) : DATA;

//     var outgoing_students = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO])

//     var SAME_GRAND_TOTAL = 0;
//     var OTHER_GRAND_TOTAL = 0;

//     outgoing_students.forEach(function (value, key) {
//         var same_region = value.get(key);
//         var other_regions = 0;

//         value.forEach(function (subValue, subKey) {
//             if (key != subKey) {
//                 other_regions += subValue
//             }
//         });

//         SAME_GRAND_TOTAL += same_region;
//         OTHER_GRAND_TOTAL += other_regions;
//     });

//     return [
//         {
//             "region" : "Stessa regione",
//             "students": SAME_GRAND_TOTAL
//         },
//         {
//             "region": "Altre regioni",
//             "students": OTHER_GRAND_TOTAL
//         }
//     ]
// }