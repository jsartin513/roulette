<template>
  <div class="column">
    <h2 class="text-lg text-center border-t-2 border-b-2">Vizualization</h2>
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
    selectedSpaces: { type: Array, default: null },
  },
  computed: {
    seriesData() {
      const seriesData = this.slices.map((slice) => {
        const numberAsString = this.convertSliceNumber(slice.number)
        const anySelected =
          this.selectedSpaces && this.selectedSpaces.length > 0
        const isSelected = this.selectedSpaces
          ? this.selectedSpaces.findIndex(
              (selectedSpace) => selectedSpace === numberAsString
            ) !== -1
          : false
        const showOpaqueColor = anySelected && !isSelected
        const convertedColor = this.convertColor(slice.color, showOpaqueColor)
        return {
          name: numberAsString,
          y: 1,
          color: convertedColor,
          selected: isSelected,
        }
      })
      return seriesData
    },
    chartOptions() {
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
            allowPointSelect: false,
            dataLabels: {
              enabled: true,
              format: '{point.name}',
              style: { color: '#FFFFFF' },
              distance: -10,
            },
            // point: {opacity: (this.selectedSpaces && this.selectedSpaces.length > 0) ? 0.2 : 0.2}
          },
          series: {
            // opacity: (this.selectedSpaces && this.selectedSpaces.length > 0) ? 0.2 : 1,
            // opacity: (this.selectedSpaces && this.selectedSpaces.length > 0) ? 0.2 : 1,
            states: { select: { opacity: 1 }, hover: { opacity: 0.2 } },
          },
        },
        series: [
          { name: 'numbers', colorByPoint: true, data: this.seriesData },
        ],
      }
    },
  },
  watch: {
    selectedSpaces: {
      handler(newValue, oldValue) {},
      deep: true,
    },
  },
  methods: {
    convertSliceNumber(number) {
      if (number === 100) {
        return '00'
      }
      return number.toString()
    },
    convertColor(color, showOpaqueColor) {
      if (!showOpaqueColor) {
        return color
      }
      if (color === 'black') {
        return 'rgba(0,0,0,0.2)'
      } else if (color === 'red') {
        return 'rgba(255,0,0,0.2)'
      } else {
        return 'rgba(0,128,0,0.2)'
      }
    },
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

path.inactive {
  opacity: 0.1 !important;
}
</style>
