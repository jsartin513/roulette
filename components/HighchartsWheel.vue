<template>
  <div class="content">
    <div :v-if="slices">
      <highcharts :options="chartOptions" />
    </div>
  </div>
</template>
<script>
import { Chart } from 'highcharts-vue'
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import highchartsMoreInit from "highcharts/highcharts-more";
import solidGaugeInit from "highcharts/modules/solid-gauge";
import { createSlices } from '../static/slices'

exportingInit(Highcharts);
highchartsMoreInit(Highcharts);
solidGaugeInit(Highcharts);

export default {
  name: 'RouletteWheel',
  components: {
    highcharts: Chart,
  },
  data() {
    return { slices: [] }
  },
  computed: {
    chartOptions() {
      const seriesData = this.slices.map((slice) => {
        return { name: this.convertSliceNumber(slice.number), y: 100 / 38, color: slice.color }
      })
      return {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
        },
        tooltip: false,
        title: { text: 'Roulette Wheel' },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: { color: '#FFFFFF' },
              distance: -10
            },
          },
        },
        series: [{ name: 'numbers', colorByPoint: true, data: seriesData }],
      }
    },
  },
  created() {
    this.initSlices()
  },
  methods: {
    initSlices() {
      this.slices = createSlices()
    },
    convertSliceNumber(number){
      if (number === 100){
        return "00";
      } 
      return number.toString()
    }
  },
}
</script>

<style scoped>
.highcharts-figure,
.highcharts-data-table table {
  min-width: 420px;
  max-width: 800px;
  margin: 1em auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}

.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}

.highcharts-data-table tr:hover {
  background: #f1f7ff;
}

input[type='number'] {
  min-width: 50px;
}
</style>
