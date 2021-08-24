// Component unique IDs
export var MAP_INCOMING_ID = 'MAP_INCOMING_ID'
export var MAP_OUTGOING_ID = 'MAP_OUTGOING_ID'
export var MAIN_BAR_CHART_FIELD_OF_STUDY = 'MAIN_BAR_CHART_FIELD_OF_STUDY'
export var OUTGOING_BAR_CHART_FIELD_OF_STUDY = 'OUTGOING_BAR_CHART_FIELD_OF_STUDY'
export var OUTGOING_REGION_TREND_ID = 'OUTGOING_REGION_TREND_ID'
export var OUTGOING_REGION_PIECHART_ID = 'OUTGOING_REGION_PIECHART_ID'
export var INCOMING_BAR_CHART_FIELD_OF_STUDY = 'INCOMING_BAR_CHART_FIELD_OF_STUDY'
export var INCOMING_REGION_TREND_ID = 'INCOMING_REGION_TREND_ID'
export var INCOMING_REGION_PIECHART_ID = 'INCOMING_REGION_PIECHART_ID'

// Single Year Selection 
export var ACCADEMIC_YEARS = ["2010-11", "2011-12", "2012-13", "2014-15", "2015-16", "2016-17", "2017-18", "2018-19"]
export var DEFAULT_SELECTED_YEAR = "2018-19"

// CSV KEYS
export var CSV_KEYS = {
    ANNO: "AnnoA",
    REGIONE_FROM: "RegioneResidenza_FROM",
    REGIONE_TO: "AteneoRegione_TO",
    PROVINCIA_FROM: "ProvinciaResidenza_FROM",
    CORSO: "CorsoTipo",
    ISCRITTI: "Iscritti"
}

// GENERAL STATISTICS SINGLE SEARCH
// Tab
export var OUTGOING_STUDENTS_FIELD = 'outgoing_students'
export var INCOMING_STUDENTS_FIELD = 'incoming_students'
export var NAME_FIELD = 'name'
export var TAB_CONFIG = {
    columns: [
        {
            field: NAME_FIELD,
            label: 'Regione',
        },
        {
            field: OUTGOING_STUDENTS_FIELD,
            label: 'Studenti in uscita',
            width: '40',
            numeric: true,
            sortable: true
        },
        {
            field: INCOMING_STUDENTS_FIELD,
            label: 'Studenti in entrata',
            width: '40',
            numeric: true,
            sortable: true
        }
    ]
}

// Barchart
export var DEGREE_FIELD = "degree"
export var STUDENTS_FIELD = "students"

export var BARCHART_OPTIONS = {
    xaxes_name: DEGREE_FIELD,
    yaxes_name: STUDENTS_FIELD,
    series: {
        tooltipText: "{categoryX}: [bold]{valueY}[/]",
        fillOpacity: .8
    },
    columnTemplate: {
        strokeWidth: 2,
        strokeOpacity: 1
    }
};

// Chord
export var FROM_CHORD_FIELD = "from"
export var TO_CHORD_FIELD = "to"
export var VALUE_CHORD_FIELD = "value"

export var CHORD_CONFIG = {
    dataFields: {
        fromName: FROM_CHORD_FIELD,
        toName: TO_CHORD_FIELD,
        value: VALUE_CHORD_FIELD
    }
}

// DETAILED SINGLE SEARCH
export var REGIONS_LIST = ["PIEMONTE","VALLE D'AOSTA","LOMBARDIA","TRENTINO ALTO ADIGE","VENETO","FRIULI VENEZIA GIULIA","LIGURIA","EMILIA ROMAGNA","TOSCANA","UMBRIA","MARCHE","LAZIO","ABRUZZO","MOLISE","CAMPANIA","PUGLIA","BASILICATA","CALABRIA","SICILIA","SARDEGNA"]

// Map
export var MIN_OUT_COLOR = "white"
export var MAX_OUT_COLOR = "green"
export var MIN_INC_COLOR = "white"
export var MAX_INC_COLOR = "blue"
export var AMOUNT_FIELD = "amount"
export var ID_FIELD = "id"