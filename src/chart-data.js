import { Line, mixins } from "vue-chartjs";


export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['chart'],
    data() {
        return {

            a: [],

            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: true
                        }
                    }]
                },
                legend: {
                    display: false
                },


                responsive: true,
                maintainAspectRatio: false
            }
        };
    },


    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.chartData, this.options)
    }

}

//../src/Chart.js