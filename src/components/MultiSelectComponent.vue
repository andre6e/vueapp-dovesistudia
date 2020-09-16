<template>
    <div> 
        <b-field grouped>

            <b-field expanded label="Inserisci le regioni che vuoi filtrare in uscita" label-position="on-border">
                <b-taginput
                    v-model="tags"
                    :data="filteredTags"
                    autocomplete
                    field="name"
                    icon="label"
                    placeholder="Seleziona una regione"
                    @typing="getFilteredTags">
                </b-taginput>

            </b-field>

            <b-field>
                <b-button  @click="clickMe"> Tutte </b-button>
            </b-field>

            <b-field>
                <b-button  @click="clearSelection"> Pulisci </b-button>
            </b-field>



            
            
        </b-field>
    


    
    </div>

</template>

<script>
const data = [{"id":1, "name": "ABRUZZO"},
{"id":2,"name": "BASILICATA"},
{"id":3,"name": "CAMPANIA"},
{"id":4,"name": "EMILIA-ROMAGNA"},
{"id":5,"name": "FRIULI-VENEZIA-GIULIA"},
{"id":6,"name": "LAZIO"},
{"id":7,"name": "LIGURIA"},
{"id":8,"name": "LOMBARDIA"},
{"id":9,"name": "MARCHE"},
{"id":10,"name": "MOLISE"},
{"id":11,"name": "PIEMONTE"},
{"id":12,"name": "PUGLIA"},
{"id":13,"name": "SARDEGNA"},
{"id":14,"name": "SICILIA"},
{"id":15,"name": "TOSCANA"},
{"id":16,"name": "TRENTINO-ALTO ADIGE"},
{"id":17,"name": "UMBRIA"},
{"id":18,"name": "VALLE D'AOSTA"},
{"id":19,"name": "VENETO"},
]

export default {
    name: 'MultiSelectComponent',
    props: {
        provincesData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            filteredTags: data,
            isSelectOnly: false,
            tags: [],
            allowNew: false,
            openOnFocus: false
        }
    },
    methods: {
        getFilteredTags(text) {
            this.filteredTags = data.filter((option) => {
                return option.name
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        clickMe() {
            this.tags = this.filteredTags
        },
        clearSelection() {
            this.tags = []
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>