export var PROVINCESTABLE_MOCK = {
    data: [
        { 'students': 20, 'name': 'Jesse', 'items': 
        [   
            {
                'name' : 'Roma',
                'students' : 10,
            },
            {
                'name' : 'Matera',
                'students' : 10,
            },

        ]},
        { 'students': 2, 'name': 'John', },
        { 'students': 3, 'name': 'Tina', },
        { 'students': 4, 'name': 'Clarence', },
        { 'students': 5, 'name': 'Anne', }
    ],
    columns: [
        {
            field: 'name',
            label: 'Regione',
        },
        {
            field: 'students',
            label: 'Studenti',
            width: '40',
            numeric: true
        }
    ]
}

export var PROVINCESTABLE_MOCK2 = {
    data: [
        { 'students': 20, 'name': 'Jessee', 'items': 
            [   
                {
                    'name' : 'Roma',
                    'students' : 10,
                },
                {
                    'name' : 'Matera',
                    'students' : 10,
                },

            ]
        },
        { 'students': 40, 'name': 'Jesse', 'items': 
            [   
                {
                    'name' : 'Roma',
                    'students' : 20,
                },
                {
                    'name' : 'Matera',
                    'students' : 20,
                },

            ]
        },
        { 'students': 2, 'name': 'John', },
        { 'students': 3, 'name': 'Tina', },
        { 'students': 4, 'name': 'Clarence', },
        { 'students': 5, 'name': 'Anne', }
    ],
    columns: [
        {
            field: 'name',
            label: 'Regione',
        },
        {
            field: 'students',
            label: 'Studenti',
            width: '40',
            numeric: true
        }
    ]
}