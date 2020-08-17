<template>
    <div class="small">
        <bar-chart :chart-data="datacollection"></bar-chart>
    </div>
</template>

<script>
    import BarChart from './BarChart.js'

    export default {
        components: {
            BarChart
        },
        data () {
            return {
                datacollection: null
            }
        },
        mounted () {
            this.fillData()
        },
        methods: {
            fillData () {
                this.datacollection = {
                    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'],
                    datasets: [
                        {
                            label: 'Доход',
                            backgroundColor: '#f87979',
                            data: [40, 20, 30 , 50 ]
                        },
                        {
                            label: 'Расход',
                            backgroundColor: '#1E88E6',
                            data: [30, 25, 35 , 40 ]
                        }
                    ]
                }
            }
        }
    }
</script>

<style>
    .small {
        max-width: 400px;
        margin:  20px auto;
    }
</style>