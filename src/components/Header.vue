<template>
    <div id="introcontainer">
        <section class="hero is-small is-bold">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title whitecolor">
                        Come ci si sposta per gli studi universitari?
                    </h1>
                    <h2 class="subtitle whitecolor">
                        Analisi interattiva dello spostamento degli studenti universitari italiani all'interno della penisola.
                    </h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#introcontainer {
    background: linear-gradient(90deg, #cf70f6 0%, #1f56ac 100%)
}

.whitecolor {
    color: white
}
</style>
