<template>
    <section class="section-1rem-pad">

        <b-tabs position="is-centered" class="block">
            <b-tab-item label="Singolo anno">
                <SingleYearSeach></SingleYearSeach>
            </b-tab-item>
            <b-tab-item label="Intervallo temporale"><p>Intervallo temporale search</p></b-tab-item>
        </b-tabs>

        
    
    </section>
</template>

<script>
import SingleYearSeach from './SingleYearSearch.vue'


export default {
    name: 'GlobalView',
    props: {
        msg: String
    },
    components: {
        SingleYearSeach
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.section-1rem-pad {
    padding: 1rem
}

</style>
