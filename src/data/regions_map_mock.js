// export var REGIONS_MOCK_DATA = [
//   {
//     department_id: 1,
//     department_name: "PIEMONTE",
//     amount_student: 91.11
//   },
//   {
//     department_id: 2,
//     department_name: "VALLE D'AOSTA",
//     amount_student: 91.1
//   },
//   {
//     department_id: 3,
//     department_name: "LOMBARDIA",
//     amount_student: 84.57
//   },
//   {
//     department_id: 4,
//     department_name: "TRENTINO ALTO ADIGE",
//     amount_student: 68.97
//   },
//   {
//     department_id: 5,
//     department_name: "VENETO",
//     amount_student: 83.18
//   },
//   {
//     department_id: 6,
//     department_name: "FRIULI VENEZIA GIULIA",
//     amount_student: 77.55
//   },
//   {
//     department_id: 7,
//     department_name: "LIGURIA",
//     amount_student: 83.51
//   },
//   {
//     department_id: 8,
//     department_name: "EMILIA ROMAGNA",
//     amount_student: 88.64
//   },
//   {
//     department_id: 9,
//     department_name: "TOSCANA",
//     amount_student: 76.12
//   },
//   {
//     department_id: 10,
//     department_name: "UMBRIA",
//     amount_student: 81.72
//   },
//   {
//     department_id: 11,
//     department_name: "MARCHE",
//     amount_student: 86.95
//   },
//   {
//     department_id: 12,
//     department_name: "LAZIO",
//     amount_student: 80.06
//   },
//   {
//     department_id: 13,
//     department_name: "ABRUZZO",
//     amount_student: 71.56
//   },
//   {
//     department_id: 14,
//     department_name: "MOLISE",
//     amount_student: 87.64
//   },
//   {
//     department_id: 15,
//     department_name: "CAMPANIA",
//     amount_student: 77.35
//   },
//   {
//     department_id: 16,
//     department_name: "PUGLIA",
//     amount_student: 78.68
//   },
//   {
//     department_id: 17,
//     department_name: "BASILICATA",
//     amount_student: 83.78
//   },
//   {
//     department_id: 18,
//     department_name: "CALABRIA",
//     amount_student: 90.45
//   },
//   {
//     department_id: 19,
//     department_name: "SICILIA",
//     amount_student: 90.45
//   },
//   {
//     department_id: 20,
//     department_name: "SARDEGNA",
//     amount_student: 90.45
//   }
// ]

export var REGIONS_MOCK_DATA = {
  data:  {"PIEMONTE":{"amount":91.11,"id":1},"VALLE D'AOSTA":{"amount":91.1,"id":2},"LOMBARDIA":{"amount":84.57,"id":3},"TRENTINO ALTO ADIGE":{"amount":68.97,"id":4},"VENETO":{"amount":83.18,"id":5},"FRIULI VENEZIA GIULIA":{"amount":77.55,"id":6},"LIGURIA":{"amount":83.51,"id":7},"EMILIA ROMAGNA":{"amount":88.64,"id":8},"TOSCANA":{"amount":76.12,"id":9},"UMBRIA":{"amount":81.72,"id":10},"MARCHE":{"amount":86.95,"id":11},"LAZIO":{"amount":80.06,"id":12},"ABRUZZO":{"amount":71.56,"id":13},"MOLISE":{"amount":87.64,"id":14},"CAMPANIA":{"amount":77.35,"id":15},"PUGLIA":{"amount":78.68,"id":16},"BASILICATA":{"amount":83.78,"id":17},"CALABRIA":{"amount":90.45,"id":18},"SICILIA":{"amount":90.45,"id":19},"SARDEGNA":{"amount":90.45,"id":20}},
  min: 68,
  max: 91,
  min_color: 'white',
  max_color: 'green'
}

// https://mycolor.space/gradient?ori=to+right&hex=%23370505&hex2=%23E5EB12&sub=1
// https://colorbrewer2.org/#type=sequential&scheme=OrRd&n=3
export var MAP_CONFIG = {
  colorScale: ["fee8c8", "fdbb84", "e34a33"],
  value: {
    key: "amount_student",
    metric: "studenti"
  },
  legendTitle: 'Studenti che vanno via'
}

export var MAP_CONFIG2 = {
  colorScale: ["e5f5f9", "99d8c9", "2ca25f"],
  value: {
    key: "amount_student",
    metric: "studenti"
  },
  legendTitle: 'Studenti che arrivano'
}