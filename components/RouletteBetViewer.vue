<template>
  <div class="content flex flex-row">
    <betTypes
      :bet-types="betTypes"
      :selected-bet-type="selectedBetType"
      @selectBetType="selectBetType"
      @clearBet="selectBetType(-1)"
    />
    <highcharts
      :slices="slices"
      :selected-spaces="selectedSpaces"
      :wheel-offset="wheelOffset"
      @rotate="rotateWheel()"
    />
  </div>
</template>
<script>
import { createSlices } from '../static/slices'
import { createBets } from '../static/bets'
import HighchartsColumn from './HighchartsColumn'
import BetTypeColumn from './BetTypeColumn'

export default {
  name: 'RouletteWheel',
  components: {
    highcharts: HighchartsColumn,
    betTypes: BetTypeColumn,
  },
  data() {
    return { slices: null, betTypes: null, wheelOffset: 0 }
  },
  computed: {
    selectedBetType() {
      return this.betTypes.find((betType) => betType.selected === true)
    },
    selectedSpaces() {
      let spaces = []
      if (this.selectedBetType) {
        console.log(this.selectedBetType.type)
        if (this.selectedBetType.type === 'specific') {
          spaces = this.selectedBetType.spaces
        } else if (this.selectedBetType.type === 'straight') {
          const nunmber = parseInt(this.selectedBetType.name[0])
          console.log(nunmber)
          console.log(this.slices.slice(0, nunmber).map((space) => {
            return space.number
          }))
          return this.slices.slice(0, nunmber).map((space) => {
            return space.number.toString()
          })
        }
      }
      return spaces.map((space) => {
        return space.slice
      })
    },
  },
  created() {
    this.initSlices()
    this.initBetTypes()
  },
  methods: {
    initBetTypes() {
      this.betTypes = createBets()
      this.betTypes.forEach((betType) => (betType.selected = false))
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
    rotateWheel() {
      const tempslice = this.slices.shift()
      this.slices.push(tempslice)
      this.wheelOffset++
    },
  },
}
</script>

<style scoped>
.column {
  margin: 1em 4em;
}

input[type='number'] {
  min-width: 50px;
}
</style>
