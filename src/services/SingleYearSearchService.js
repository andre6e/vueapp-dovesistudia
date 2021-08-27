import * as d3 from "d3";

import { 
    CSV_KEYS,
    // mode
    OUT_MODE,
    IN_MODE,
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

var formatCurrentRegionsName = function(incoming_list_param) {
    var str = "";

    for (var i=0; i<incoming_list_param.length;i++) {
        str += incoming_list_param[i];

        if (i != incoming_list_param.length - 1) {
            str += ", "
        }
    }

    return str;
};

// SHARED ELAB FUNCTIONS

var elabChordData = function(regions_list, mode) {
    // il parametro mi serve per capire se sto agendo per il chord del general o delle detailed statistics
    var completeData = [];
    var noAutoArchsData = [];

    var students_map = null;
    var filteredData = DATA;

    if (mode && mode == IN_MODE) {
        // IN
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_TO])});
        }

        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_TO], d => d[CSV_KEYS.REGIONE_FROM])
    } else {
        // OUT e GENERAL
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_FROM])});
        }

        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO])
    }

    students_map.forEach(function (value, key) {
        value.forEach(function (subValue, subKey) {
            var obj = {}
            obj[FROM_CHORD_FIELD] = key
            obj[TO_CHORD_FIELD] = subKey
            obj[VALUE_CHORD_FIELD] = subValue

            completeData.push(obj);

            if (key != subKey && mode) {
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

    if (!updatingDetailedView) {
        // GENERAL SEARCH
        outgoing_students = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM]);
        incoming_students = d3.rollup(DATA, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO]);
    } else {
        if (outgoing_list_param != null) {
            // OUTGOING DETAILED
            var outgoingFilteredData = DATA.filter(function (d) {
                return outgoing_list_param.includes(d[CSV_KEYS.REGIONE_FROM])
            });
    
            outgoing_students = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
            incoming_students = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO])
        } else {
            // INCOMING DETAILED
            var incomingFilteredData = DATA.filter(function (d){
                return incoming_list_param.includes(d[CSV_KEYS.REGIONE_TO])
            });
    
            incoming_students = d3.rollup(incomingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_TO])
            outgoing_students = d3.rollup(incomingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM])
        }
    }

    return {
        outgoing_students: outgoing_students,
        incoming_students: incoming_students
    }
};

var elabOutMapData = function(outgoing_students) {
    // OUTGOING
    var toReturnOut = {}
    var OBJ_OUT_DATA = {}

    outgoing_students.forEach(function (value, key) {
        var obj = {};

        obj[AMOUNT_FIELD] = value;
        obj[ID_FIELD] = key;
        
        OBJ_OUT_DATA[key] = obj
    });

    toReturnOut["data"] = OBJ_OUT_DATA;
    toReturnOut["min_color"] = MIN_OUT_COLOR;
    toReturnOut["max_color"] = MAX_OUT_COLOR;
    toReturnOut["tooltip_text"] = "uscenti";

    return toReturnOut;
};

var elabInMapData = function(incoming_students) {
    // INCOMING
    var toReturnIn = {}
    var OBJ_IN_DATA = {}

    incoming_students.forEach(function (value, key) {
        var obj = {};

        obj[AMOUNT_FIELD] = value;
        obj[ID_FIELD] = key;
        
        OBJ_IN_DATA[key] = obj;
    });

    toReturnIn["data"] = OBJ_IN_DATA;
    toReturnIn["min_color"] = MIN_INC_COLOR;
    toReturnIn["max_color"] = MAX_INC_COLOR;
    toReturnIn["tooltip_text"] = "entranti";

    return toReturnIn;
};

var elabDetailedTabData = function(regions_list, mode) {
    var filteredData = DATA;
    var students_map = null;
    var total_outgoing = null;

    if (mode == OUT_MODE) {
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_FROM])})
        }

        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO]);
        total_outgoing = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM]);
    } else {
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_TO])})
        }

        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_TO], d => d[CSV_KEYS.REGIONE_FROM]);
        total_outgoing = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_TO]);
    }

    

    // var outgoing_region_provinces = d3.rollup(outgoingFilteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]),  d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.PROVINCIA_FROM])
    var data = []


    students_map.forEach(function (out_regs, key) {
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
        REG_OBJ[DETAILED_TAB_PERCENTAGE_FIELD] = ""

        data.push(REG_OBJ);
    });

    return {
        data: sortStudentsDescending(data),
        columns: DETAILED_TAB_COLUMNS_CONFIG
    };
};

var elabDetailedCourseTypologyChart = function (regions_list, mode) {
    var filteredData = DATA;
    var typology_map = null;

    if (mode == OUT_MODE) {
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_FROM])})
        }
    } else {
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_TO])})
        }
    }
    
    typology_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.CORSO])

    var toReturn = [];

    typology_map.forEach(function (value, key) {
        var obj = {};

        obj[DEGREE_FIELD] = getTypologyLegend(key);
        obj[STUDENTS_FIELD] = value;

        toReturn.push(obj);
    });

    return sortStudentsDescending(toReturn);
};

var elabDetailedPercentageData = function (regions_list, mode) {
    var filteredData = DATA;
    var students_map = null;

    if (mode == OUT_MODE) {
        // out detailed view
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_FROM])});
        }

        students_map = d3.rollup(filteredData, v => d3.sum(v, d => d[CSV_KEYS.ISCRITTI]), d => d[CSV_KEYS.REGIONE_FROM], d => d[CSV_KEYS.REGIONE_TO])
    } else {
        if (regions_list) {
            filteredData = DATA.filter(function (d) { return regions_list.includes(d[CSV_KEYS.REGIONE_TO])});
        }
        // in detailed view
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

    return {
        samePercentage: Math.round((SAME_GRAND_TOTAL / (SAME_GRAND_TOTAL + OTHER_GRAND_TOTAL)) * 100),
        othersPercentage: Math.round((OTHER_GRAND_TOTAL / (SAME_GRAND_TOTAL + OTHER_GRAND_TOTAL)) * 100),
        sameGrandTotal: SAME_GRAND_TOTAL,
        othersGrandTotal: OTHER_GRAND_TOTAL
    }
};

// LOADERS

var loadGeneralStatistics = function() {
    var safeMapData = safeElabMapData(null, null, false);

    var elabResponse = {
        totalNumber: elabTotalIscritti(),
        generalTabData: elabGeneralTabData(),
        generalChordData: elabChordData(),
        detailedOutMapData: elabOutMapData(safeMapData.outgoing_students),
        detailedOutTabData: elabDetailedTabData(null, OUT_MODE),
        detailedOutBarChartData: elabDetailedCourseTypologyChart(null, OUT_MODE),
        detailedOutChordData: elabChordData(REGIONS_LIST, OUT_MODE),
        detailedOutPercentage: elabDetailedPercentageData(null, OUT_MODE),
        detailedInMapData: elabInMapData(safeMapData.incoming_students),
        detailedInPercentage: elabDetailedPercentageData(null, IN_MODE),
        detailedInTabData: elabDetailedTabData(null, IN_MODE),
        detailedInChordData: elabChordData(REGIONS_LIST, IN_MODE),
        detailedInBarChartData: elabDetailedCourseTypologyChart(null, IN_MODE),
    }
    
    return elabResponse;
};

var loadDetailedOutStatistics = function(outgoing_list_param) {
    var safeMapData = safeElabMapData(outgoing_list_param, null, true);

    var elabResponse = {
        detailedOutTabData: elabDetailedTabData(outgoing_list_param, OUT_MODE),
        detailedOutBarChartData: elabDetailedCourseTypologyChart(outgoing_list_param, OUT_MODE),
        detailedOutMapData: elabOutMapData(safeMapData.outgoing_students),
        detailedOutChordData: elabChordData(outgoing_list_param, OUT_MODE),
        detailedOutPercentage: elabDetailedPercentageData(outgoing_list_param, OUT_MODE)
    };
    
    return elabResponse;
};

var loadDetailedInStatistics = function(incoming_list_param) {
    var safeMapData = safeElabMapData(null, incoming_list_param, true);

    var elabResponse = {
        detailedInMapData: elabInMapData(safeMapData.incoming_students),
        detailedInPercentage: elabDetailedPercentageData(incoming_list_param, IN_MODE),
        detailedInTabData: elabDetailedTabData(incoming_list_param, IN_MODE),
        detailedInChordData: elabChordData(incoming_list_param, IN_MODE),
        detailedInBarChartData: elabDetailedCourseTypologyChart(incoming_list_param, IN_MODE),
    };
    
    return elabResponse;
};

// API
export async function getSingleYearData(year) {
    var data = await d3.csv('dataset/' + year + ".csv");
    DATA = data;
    return loadGeneralStatistics();
}

export function updateOutDetailedView(outgoing_list_param) {
    return loadDetailedOutStatistics(outgoing_list_param);
}

export function updateInDetailedView(incoming_list_param) {
    return loadDetailedInStatistics(incoming_list_param)
}

export function getDetailedInSelectionText(incoming_list_param) {
    var base_str = "Stai analizzando gli studenti che arrivano ";

            
    if (incoming_list_param.length == REGIONS_LIST.length) {
        base_str += "in tutte le regioni";
    } else if (incoming_list_param.length == 1) {
        base_str += "nella regione " + incoming_list_param[0];
    } else {
        base_str += "nelle regioni " + formatCurrentRegionsName(incoming_list_param)
    }

    return base_str;
}

export function getDetailedOutSelectionText(outgoing_list_param) {
    var base_str = "Stai analizzando gli studenti che vanno via ";

    if (outgoing_list_param.length == REGIONS_LIST.length) {
        base_str += "da tutte le regioni";
    } else if (outgoing_list_param.length == 1) {
        base_str += "dalla regione " + outgoing_list_param[0];
    } else {
        base_str += "dalle regioni " + formatCurrentRegionsName(outgoing_list_param)
    }

    return base_str;
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