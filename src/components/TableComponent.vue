<template>
    <div class="myb-table-wrapper">
        <b-table :data="chartData.data" :columns="chartData.columns" :paginated="true" :per-page="10" default-sort="outgoing_students" default-sort-direction="desc"> </b-table>
    </div>
</template>

<script>
export default {
    name: 'TableComponent',
    props: {
        chartData: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myb-table-wrapper {
    width: 100%;
}
</style>