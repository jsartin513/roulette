<template>
  <div class="column">
    <h2 class="text-lg text-center border-t-2 border-b-2">
      Vizualization
    </h2>
    <div>
      <highcharts :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'
import highchartsMoreInit from 'highcharts/highcharts-more'
import solidGaugeInit from 'highcharts/modules/solid-gauge'

exportingInit(Highcharts)
highchartsMoreInit(Highcharts)
solidGaugeInit(Highcharts)

export default {
  name: 'HighchartsPanel',
  components: { highcharts: Chart },
  props: {
    slices: { type: Array, default: null },
    selectedSpaces: { type: Array, default: null } 
  },
  computed: {
    chartOptions() {
      const seriesData = this.slices.map((slice) => {
        const numberAsString = this.convertSliceNumber(slice.number)
        const isSelected = this.selectedSpaces.findIndex((selectedSpace) => selectedSpace === numberAsString) !== -1
        return {
          name: numberAsString,
          y: 1,
          color: slice.color,
          selected: isSelected
        }
      })
      return {
        chart: {
          height: 600,
          width: 600,
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
        },
        tooltip: false,
        title: null,
        plotOptions: {
          pie: {
            allowPointSelect: true,
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: { color: '#FFFFFF' },
              distance: -10,
            },
          },
        },
        series: [{ name: 'numbers', colorByPoint: true, data: seriesData }],
      }
    },
  },
  methods: {
    convertSliceNumber(number) {
      if (number === 100) {
        return '00'
      }
      return number.toString()
    },
  },
}
</script>
