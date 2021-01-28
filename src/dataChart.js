import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  data() {
    return {
        a: [],

        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                       
                    },
                    gridLines: {
                        display: false
                    },
                    
                }],
                xAxes: [{
                    gridLines: {
                        display: false
                    }, 
                    afterFit: (scale) => {
                        scale.height = 10;
                    },
                    ticks: {
                        beginAtZero:true,
                        stepSize: 1,
                        callback: function(tickValue, index, ticks) {
                         
                          if(!(index % parseInt(ticks.length / 5))) {
                            return tickValue
                          }
      
                        }
                    },
                    tickMarkLength:1
                }]
            },
            legend: {
                display: true
            },

            responsive: true,
            maintainAspectRatio: false
        }
    };
},
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}