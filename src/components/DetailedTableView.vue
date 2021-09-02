<template>
    <div class="myb-table-wrapper">
        <b-table detailed 
            :data="chartData.data" 
            :columns="chartData.columns" 
            detail-key="name" 
            custom-detail-row 
            :paginated="true"
            default-sort="students"
            default-sort-direction="desc"
            :per-page="10">
            <template slot="detail" slot-scope="props">
                <tr v-for="item in props.row.items" :key="item.vueKey">
                    <td> </td>
                    <td > {{item.name}} </td>
                    <td class="has-text-right"> {{item.students}} </td>
                    <td class="has-text-right"> {{item.percentage}} </td>
                </tr>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'DetailedTableView',
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