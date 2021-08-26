// Component unique IDs
export var CHORD_GENERAL_SINGLEY_ID = 'CHORD_GENERAL_SINGLEY_ID'
export var MAP_INCOMING_ID = 'MAP_INCOMING_ID'
export var MAP_OUTGOING_ID = 'MAP_OUTGOING_ID'
export var MAIN_BAR_CHART_FIELD_OF_STUDY = 'MAIN_BAR_CHART_FIELD_OF_STUDY'
export var OUT_BAR_CHART_FIELD_OF_STUDY = 'OUT_BAR_CHART_FIELD_OF_STUDY'
export var CHORD_DETAILED_OUT_SINGLEY_ID = "CHORD_DETAILED_OUT_SINGLEY_ID"

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
export var OUTGOING_STUDENTS_FIELD = 'students'
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
        strokeWidth: 0,
        strokeOpacity: 0
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
export var PROVINCES_REGIONS_MAP = {
    'AGRIGENTO': 'SICILIA',
    'ALESSANDRIA': 'PIEMONTE',
    'ANCONA': 'MARCHE',
    'AOSTA': "VALLE D'AOSTA",
    'AREZZO': 'ABRUZZO',
    'ASCOLI PICENO': 'TOSCANA',
    'ASTI': 'MARCHE',
    'AVELLINO': 'PIEMONTE',
    'BARI': 'CAMPANIA',
    'BARLETTA-ANDRIA-TRANI': 'PUGLIA',
    'BELLUNO': 'PUGLIA',
    'BENEVENTO': 'VENETO',
    'BERGAMO': 'CAMPANIA',
    'BIELLA': 'LOMBARDIA',
    'BOLOGNA': 'PIEMONTE',
    'BOLZANO': 'EMILIA ROMAGNA',
    'BRESCIA': 'TRENTINO ALTO ADIGE',
    'BRINDISI': 'LOMBARDIA',
    'CAGLIARI': 'PUGLIA',
    'CALTANISSETTA': 'SARDEGNA',
    'CAMPOBASSO': 'SICILIA',
    'CARBONIA-IGLESIAS': 'MOLISE',
    'CASERTA': 'SARDEGNA',
    'CATANIA': 'CAMPANIA',
    'CATANZARO': 'SICILIA',
    'CHIETI': 'CALABRIA',
    'COMO': 'ABRUZZO',
    'COSENZA': 'LOMBARDIA',
    'CREMONA': 'CALABRIA',
    'CROTONE': 'LOMBARDIA',
    'CUNEO': 'CALABRIA',
    'ENNA': 'PIEMONTE',
    'FERMO': 'SICILIA',
    'FERRARA': 'MARCHE',
    'FIRENZE': 'EMILIA ROMAGNA',
    'FOGGIA': 'TOSCANA',
    'FORLÌ-CESENA': 'PUGLIA',
    'FROSINONE': 'EMILIA ROMAGNA',
    'GENOVA': 'LAZIO',
    'GORIZIA': 'LIGURIA',
    'GROSSETO': 'FRIULI VENEZIA GIULIA',
    'IMPERIA': 'TOSCANA',
    'ISERNIA': 'LIGURIA',
    'LA SPEZIA': 'MOLISE',
    "L'AQUILA": 'LIGURIA',
    'LATINA': 'LAZIO',
    'LECCE': 'PUGLIA',
    'LECCO': 'LOMBARDIA',
    'LIVORNO': 'TOSCANA',
    'LODI': 'LOMBARDIA',
    'LUCCA': 'TOSCANA',
    'MACERATA': 'MARCHE',
    'MANTOVA': 'LOMBARDIA',
    'MASSA-CARRARA': 'TOSCANA',
    'MATERA': 'BASILICATA',
    'MESSINA': 'SARDEGNA',
    'MILANO': 'SICILIA',
    'MODENA': 'LOMBARDIA',
    'MONZA E DELLA BRIANZA': 'EMILIA ROMAGNA',
    'NAPOLI': 'LOMBARDIA',
    'NOVARA': 'CAMPANIA',
    'NUORO': 'PIEMONTE',
    'OLBIA-TEMPIO': 'SARDEGNA',
    'ORISTANO': 'SARDEGNA',
    'PADOVA': 'SARDEGNA',
    'PALERMO': 'SARDEGNA',
    'PARMA': 'VENETO',
    'PAVIA': 'SICILIA',
    'PERUGIA': 'EMILIA ROMAGNA',
    'PESARO E URBINO': 'LOMBARDIA',
    'PESCARA': 'UMBRIA',
    'PIACENZA': 'MARCHE',
    'PISA': 'ABRUZZO',
    'PISTOIA': 'EMILIA ROMAGNA',
    'PORDENONE': 'TOSCANA',
    'POTENZA': 'TOSCANA',
    'PRATO': 'FRIULI VENEZIA GIULIA',
    'RAGUSA': 'BASILICATA',
    'RAVENNA': 'TOSCANA',
    'REGGIO CALABRIA': 'SICILIA',
    'REGGIO EMILIA': 'EMILIA ROMAGNA',
    'RIETI': 'CALABRIA',
    'RIMINI': 'EMILIA ROMAGNA',
    'ROMA': 'LAZIO',
    'ROVIGO': 'EMILIA ROMAGNA',
    'SALERNO': 'LAZIO',
    'MEDIO CAMPIDANO': 'VENETO',
    'SASSARI': 'CAMPANIA',
    'SAVONA': 'SARDEGNA',
    'SIENA': 'LIGURIA',
    'SIRACUSA': 'TOSCANA',
    'SONDRIO': 'SICILIA',
    'TARANTO': 'LOMBARDIA',
    'TERAMO': 'PUGLIA',
    'TERNI': 'ABRUZZO',
    'TORINO': 'UMBRIA',
    'OGLIASTRA': 'PIEMONTE',
    'TRAPANI': 'SICILIA',
    'TRENTO': 'TRENTINO ALTO ADIGE',
    'TREVISO': 'VENETO',
    'TRIESTE': 'FRIULI VENEZIA GIULIA',
    'UDINE': 'FRIULI VENEZIA GIULIA',
    'VARESE': 'LOMBARDIA',
    'VENEZIA': 'VENETO',
    'VERBANO-CUSIO-OSSOLA': 'PIEMONTE',
    'VERCELLI': 'PIEMONTE',
    'VERONA': 'VENETO',
    'VIBO VALENTIA': 'CALABRIA',
    'VICENZA': 'VENETO',
    'VITERBO': 'LAZIO'
}

// Map
export var MIN_OUT_COLOR = "white"
export var MAX_OUT_COLOR = "green"
export var MIN_INC_COLOR = "white"
export var MAX_INC_COLOR = "blue"
export var AMOUNT_FIELD = "amount"
export var ID_FIELD = "id"

// Provinces table
export var DETAILED_TAB_NAME_FIELD = "name"
export var DETAILED_TAB_STUDENTS_FIELD = "students"
export var DETAILED_TAB_ITEMS_FIELD = "items"
export var DETAILED_TAB_PERCENTAGE_FIELD = "percentage"
export var DETAILED_TAB_COLUMNS_CONFIG = [
    {
        field: DETAILED_TAB_NAME_FIELD,
        label: 'Regione',
    },
    {
        field: DETAILED_TAB_STUDENTS_FIELD,
        label: 'Studenti',
        width: '40',
        numeric: true,
        sortable: true
    },
    {
        field: DETAILED_TAB_PERCENTAGE_FIELD,
        label: '%',
        width: '10'
    }
]

export var TYPOLOGY_LEGEND = {
    "LAUREA" : "LAUREA",
    "LAUREA MAGISTRALE": "L.M.",
    "LAUREA MAGISTRALE CICLO UNICO": "LM C.U.",
    "VECCHIO ORDINAMENTO": "V.O."
}