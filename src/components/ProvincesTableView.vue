<template>
    <div class="myb-table-wrapper">
        <b-table detailed 
            :data="provincesData.data" 
            :columns="provincesData.columns" 
            detail-key="name" 
            custom-detail-row 
            :paginated="true"
            :per-page="5">
            <template slot="detail" slot-scope="props">
                <tr v-for="item in props.row.items" :key="item.name">
                    <td> </td>
                    <td > {{item.name}} </td>
                    <td class="has-text-right"> {{item.students}} </td>
                </tr>
            </template>
        </b-table>
    </div>
    
</template>

<script>
export default {
    name: 'ProvincesTableView',
    props: {
        provincesData: {
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