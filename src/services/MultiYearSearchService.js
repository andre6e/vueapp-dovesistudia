import * as d3 from "d3";

import { 
    CSV_KEYS,
    ACCADEMIC_YEARS,
    ACCADEMIC_YEARS_MULTI_MIN,
    ACCADEMIC_YEARS_MULTI_MAX
} from '../constants/constants';

var DATA = {}



// LOADERS

// var loadGeneralStatistics = function() {
    
    
// };

var elabRawData = function(data) {
    for (var i = 0; i<data.length; i++) {
        var key = data[i][0][CSV_KEYS.ANNO];

        DATA[key] = data[i]
    }
};

var elabTotalIscritti = function (filteredData) {
    return d3.sum(filteredData, d =>  d[CSV_KEYS.ISCRITTI]);
};

var elabMultiYearData = function(filteredData) {
    return {
        totalNumber: elabTotalIscritti(filteredData)
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

    return elabMultiYearData(filteredData);
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

