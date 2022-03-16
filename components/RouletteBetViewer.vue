<template>
  <div class="content flex flex-row">
    <betTypes :bet-types="betTypes" @selectBetType="selectBetType" />
    <highcharts :slices="slices" :selected-spaces="selectedSpaces" />
    
  </div>
</template>
<script>
import { createSlices } from '../static/slices'
import HighchartsPanel from './HighchartsPanel'
import BetTypePanel from './BetTypePanel'

export default {
  name: 'RouletteWheel',
  components: {
    highcharts: HighchartsPanel,
    betTypes: BetTypePanel
  },
  data() {
    return { slices: null, betTypes: null }
  },
  computed: {
    selectedBetType() {
      return this.betTypes.find((betType) => betType.selected === true);
    },
    selectedSpaces() {
      return this.selectedBetType.spaces;
    }
  },
  created() {
    this.initSlices()
    this.initBetTypes()
  },
  methods: {
    initBetTypes() {
      this.betTypes = [
        { name: 'Boom 00', selected: true, spaces: ['00'] },
        { name: 'Green', selected: false, spaces: ['00', '0'] },
        { name: 'Green++', selected: false },
        { name: '5 Across', selected: false },
        { name: '5 Bell Curve', selected: false },
        { name: '3 Bell Curve', selected: false },
        { name: '7 Across', selected: false },
        { name: '7 Slant Curve', selected: false },
        { name: '7 Bell Curve', selected: false },
      ]
    },
    initSlices() {
      this.slices = createSlices()
    },
    selectBetType(index) {
      this.betTypes.forEach((betType, idx) => {
        if (index === idx) {
          betType.selected = true
        } else {
          betType.selected = false
        }
      })
    },
  },
}
</script>

<style scoped>
.column {
  margin: 1em 4em;
}


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
