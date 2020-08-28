export var SIMPLETABLE_MOCK = {
    data: [
        { 'outgoing_students': 20, 'incoming_students': 20, 'name': 'Jesse'},
        { 'outgoing_students': 2, 'incoming_students': 2, 'name': 'John', },
        { 'outgoing_students': 3, 'incoming_students': 3, 'name': 'Tina', },
        { 'outgoing_students': 20, 'incoming_students': 20, 'name': 'Jesse'},
        { 'outgoing_students': 4, 'incoming_students': 4, 'name': 'Clarence', },
        { 'outgoing_students': 5, 'incoming_students': 5, 'name': 'Anne', },
        { 'outgoing_students': 3, 'incoming_students': 3, 'name': 'Tina', },
        { 'outgoing_students': 5, 'incoming_students': 5, 'name': 'Anne', },
        { 'outgoing_students': 4, 'incoming_students': 4, 'name': 'Clarence', },
        { 'outgoing_students': 3, 'incoming_students': 3, 'name': 'Tina', },
        { 'outgoing_students': 2, 'incoming_students': 2, 'name': 'John', },
        { 'outgoing_students': 20, 'incoming_students': 20, 'name': 'Jesse'},
        { 'outgoing_students': 2, 'incoming_students': 2, 'name': 'John', },
        { 'outgoing_students': 2, 'incoming_students': 2, 'name': 'John', },
        { 'outgoing_students': 4, 'incoming_students': 4, 'name': 'Clarence', },
        { 'outgoing_students': 5, 'incoming_students': 5, 'name': 'Anne', },
        { 'outgoing_students': 20, 'incoming_students': 20, 'name': 'Jesse'},
        { 'outgoing_students': 3, 'incoming_students': 3, 'name': 'Tina', },
        { 'outgoing_students': 4, 'incoming_students': 4, 'name': 'Clarence', },
        { 'outgoing_students': 5, 'incoming_students': 5, 'name': 'Anne', },
    ],
    columns: [
        {
            field: 'name',
            label: 'Regione',
        },
        {
            field: 'outgoing_students',
            label: 'Studenti in uscita',
            width: '40',
            numeric: true,
            sortable: true
        },
        {
            field: 'incoming_students',
            label: 'Studenti in entrata',
            width: '40',
            numeric: true,
            sortable: true
        }
    ]
}