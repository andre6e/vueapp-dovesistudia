// Component unique IDs
export var CHORD_GENERAL_SINGLEY_ID = 'CHORD_GENERAL_SINGLEY_ID'
export var MAP_INCOMING_ID = 'MAP_INCOMING_ID'
export var MAP_OUTGOING_ID = 'MAP_OUTGOING_ID'
export var MAIN_BAR_CHART_FIELD_OF_STUDY = 'MAIN_BAR_CHART_FIELD_OF_STUDY'
export var OUT_BAR_CHART_FIELD_OF_STUDY = 'OUT_BAR_CHART_FIELD_OF_STUDY'
export var IN_BAR_CHART_FIELD_OF_STUDY = 'IN_BAR_CHART_FIELD_OF_STUDY'
export var CHORD_DETAILED_OUT_SINGLEY_ID = "CHORD_DETAILED_OUT_SINGLEY_ID"
export var CHORD_DETAILED_IN_SINGLEY_ID = "CHORD_DETAILED_IN_SINGLEY_ID"

// Single Year Selection 
export var ACCADEMIC_YEARS = ["2010-11", "2011-12", "2012-13", "2013-14", "2014-15", "2015-16", "2016-17", "2017-18", "2018-19"]
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

// Mode
export var OUT_MODE = "OUT_MODE"
export var IN_MODE = "IN_MODE"

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
            label: 'Studenti in arrivo',
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
    "LAUREA" : "TRIENNALE",
    "LAUREA MAGISTRALE": "MAGISTRALE",
    "LAUREA MAGISTRALE CICLO UNICO": "CICLO UNICO",
    "VECCHIO ORDINAMENTO": "VECCHIO ORDINAMENTO"
}


// MULTIYEAR SELECTION
export var ACCADEMIC_YEARS_MULTI = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018]
export var ACCADEMIC_YEARS_MULTI_MIN = 2010
export var ACCADEMIC_YEARS_MULTI_MAX = 2018
export var GLOBAL_TRAND_ISCRITTI_CHART_ID = "GLOBAL_TRAND_ISCRITTI_CHART_ID"

export var TRANDLINE_KEY_FIELD = "year"
export var TRANDLINE_KEY_FIELD2 = "year2"
export var TRANDLINE_VALUE_FIELD = "value"
export var TRANDLINE_VALUE_FIELD2 = "value2"
export var TOOLTIP_TOOLTIP_FIELD = "tooltip"

export var TRENDLINE_CONF = {
    dateAxis: {
        location: 0.5,
        minGridDistance: 40
    },
    series: {
        tooltipText: "{"+TOOLTIP_TOOLTIP_FIELD+"}\n[bold font-size: 17px]Iscritti: {valueY}[/]",
        valueY: TRANDLINE_VALUE_FIELD,
        dateX: TRANDLINE_KEY_FIELD
    }
};

export var DOUBLE_TRAND_ISCRITTI_CHART_ID = "DOUBLE_TRAND_ISCRITTI_CHART_ID"
export var ESCLUDI_SNR_STUDENTS = "escludi studenti che restano nella stessa regione"
export var INCLUDI_SNR_STUDENTS = "includi studenti che restano nella stessa regione"
export var DEFAULT_DOUBLE_TREND_SELECTED_REGION = "BASILICATA"
export var DOUBLE_TRENDLINE_CONF = {
    dateAxis: {
        location: 0.5,
        minGridDistance: 40
    },
    series: {
        tooltipText: "{"+TOOLTIP_TOOLTIP_FIELD+"}\n[bold font-size: 17px]Iscritti uscenti: {valueY}[/]",
        tooltipText2: "{"+TOOLTIP_TOOLTIP_FIELD+"}\n[bold font-size: 17px]Iscritti entranti: {valueY}[/]",
        valueY: TRANDLINE_VALUE_FIELD,
        dateX: TRANDLINE_KEY_FIELD,
        valueY2: TRANDLINE_VALUE_FIELD2,
        dateX2: TRANDLINE_KEY_FIELD2,
        name: "Studenti in uscita",
        name2: "Studenti in arrivo"
    }
};

export var HORIZONTAL_BARCHART_OUT_ID = "HORIZONTAL_BARCHART_OUT_ID"
export var HORIZONTAL_BARCHART_IN_ID = "HORIZONTAL_BARCHART_IN_ID"
export var MAGGIOR_NUMERO_SWITCH_TEXT = "MAGGIOR NUMERO"
export var MINOR_NUMERO_SWITCH_TEXT = "MINOR NUMERO"
export var TOP_N_REGIONS = 5
export var BARCHART_Y_AXES = "students"
export var BARCHART_X_AXES = "regione"

export var HORIZONTAL_BARCHART_CONFIG = {
    x_axes: BARCHART_X_AXES,
    y_axes: BARCHART_Y_AXES,
    categoryAxis: {
        location: 0,
        minGridDistance: 1,
        inversed: true,
        template_disabled: true
    },
    series: {
        tooltipText: "{valueX.value}",
        strokeOpacity: 0,
        cornerRadiusBottomRight: 5,
        cornerRadiusTopRight: 5
    },
    labelBullet: {
        horizontalCenter: "left",
        dx: 10,
        text: "{values.valueX.workingValue.formatNumber('#.0as')}",
        locationX: 1
    }
}

export var PIECHART_OUT_ID = "PIECHART_OUT_ID"
export var PIECHART_IN_ID = "PIECHART_IN_ID"
export var PIECHART_VALUE_FIELD = "students"
export var PIECHART_CATEGORY_FIELD = "region"

export var PIECHART_CONF = {
    pieSeries: {
        value: PIECHART_VALUE_FIELD,
        category: PIECHART_CATEGORY_FIELD,
        strokeOpacity: 1,
        opacity: 1,
        endAngle: -90,
        startAngle: -90,
        labelsTemplateText: "{category}\n{value.percent.formatNumber('#.0')}%"
    }
};