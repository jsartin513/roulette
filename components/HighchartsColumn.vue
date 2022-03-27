<template>
  <div class="column">
    <h2 class="text-lg text-center border-b-2 mt-2 mb-4">Vizualization</h2>
    <div class="flex text-med border-b-2 border-dashed pb-2">
      <div class="button-group text-left w-6/12">
        <button
          class="border-2 rounded-lg py-2 px-8"
          :disabled="!enableRotate"
          @click="$emit('rotate')"
        >
          Rotate
        </button>
      </div>
      <div class="button-group text-right w-6/12">
        <button
          class="border-2 rounded-lg py-2 px-8"
          :disabled="disableZoomDown"
          @click="zoomLevel = zoomLevel - 1"
        >
          Zoom Out
        </button>
        <button
          class="border-2 rounded-lg py-2 px-8"
          :disabled="disableZoomUp"
          @click="zoomLevel = zoomLevel + 1"
        >
          Zoom In
        </button>
      </div>
    </div>

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
    wheelOffset: { type: Number, default: 0 },
  },
  emits: ['rotate'],
  data() {
    return { zoomLevel: 0 }
  },
  computed: {
    enableRotate() {
      const anySelected = this.selectedSpaces && this.selectedSpaces.length > 0

      if (anySelected) {
        // TODO: cleaner way of ruling out green focused
        return (
          this.selectedSpaces.length > 2 || this.selectedSpaces.length === 6
        )
      }
      return true
    },
    disableZoomDown() {
      return this.zoomLevel <= 0
    },
    disableZoomUp() {
      return this.zoomLevel >= 2
    },
    zoomedSlices() {
      const zoomed = []
      let include = true
      let skippedSlicesCount = 0

      this.slices.forEach((slice) => {
        if (this.zoomLevel > 0) {
          // TODO: Calculate these
          const stopNumber = this.zoomLevel === 2 ? 25 : 8
          if (slice.number === 26 || slice.number === stopNumber) {
            include = false
            skippedSlicesCount = 0
          }
          skippedSlicesCount += 1
          const startNumber = this.zoomLevel === 2 ? 36 : 15
          if (slice.number === startNumber || slice.number === 14) {
            zoomed.push({ color: 'white', skippedSlicesCount, number: 999 })
            include = true
          }
        }
        if (include) {
          zoomed.push(slice)
        }
      })
      return zoomed
    },
    seriesData() {
      const seriesData = this.zoomedSlices.map((slice) => {
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
        if (slice.skippedSlicesCount) {
          // TODO: Calculate this
          // TODO: consider separate computed property for "not real slices"
          const yNumber = this.zoomLevel === 1 ? 3 : 1
          return {
            name: `${slice.skippedSlicesCount} spots hidden`,
            y: yNumber,
            color: 'white',
            selected: isSelected,
          }
        }
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
      const calculatedOpacity =
        this.selectedSpaces && this.selectedSpaces.length > 0 ? 0.2 : 1
      // todo: fix height and width
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
          },
          series: {
            states: {
              select: { opacity: 1 },
              hover: {
                opacity: calculatedOpacity,
              },
              inactive: {
                opacity: calculatedOpacity,
              },
            },
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
      } else if (number === 999) {
        return 'inner slots'
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
