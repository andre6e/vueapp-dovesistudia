<template>
  <div id="globalcontainer">
    <section class="section is-small">
        <div class="container">
            <h1 class="title">Statistiche su singolo anno accademico</h1>

            <p class="heading">Seleziona un anno accademico</p>
            <div class="select">
                <select v-on:change="getStudentsTotalNumber()" v-model="selectedYear" placeholder="Seleziona un anno accademico" rounded>
                    <option v-for="year in years" :value="year" v-bind:key="year">{{year}}</option>
                </select>
            </div>

           

            <nav class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Totale iscritti</p>
                        <p class="title">{{totalNumber}}</p>
                    </div>
                </div>
            </nav>


            
        </div>


        <section >
            <div class="columns" >
                <div class="column is-half">
                    Outgoing students
                    <MapComponent/>
                </div>
                
                <div class="column is-half">
                    Incoming students
                    <MapComponent/>
                </div>
            </div>

        </section>
    </section>

   
  </div>
</template>

<script>
import MapComponent from './MapComponent.vue'

export default {
  name: 'GlobalView',
  props: {
    msg: String
  },
  components: {
    MapComponent
  },
  data: function() {
      return {
          years: ["2010/11", "2011/12", "2012/13", "2014/15", "2015/16", "2016/17", "2017/18", "2018/19"],
          selectedYear: "2018/19",
          totalNumber: 100,
          totalStudentsNumber: {
              "2010/11": 100,
              "2011/12": 200,
              "2012/13": 300,
              "2013/14": 400,
              "2014/15": 500,
              "2015/16": 600,
              "2016/17": 700,
              "2017/18": 800,
              "2018/19": 900,
          }
      }
  },
  methods: {
      getStudentsTotalNumber() {
          this.totalNumber =  this.totalStudentsNumber[this.selectedYear]
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
