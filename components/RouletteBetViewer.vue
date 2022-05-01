<template>
  <div class="content flex flex-row">
    <betTypes
      v-if="false"
      :bet-types="betTypes"
      :selected-bet-type="selectedBetType"
      @selectBetType="selectBetType"
      @clearBet="selectBetType(-1)"
    />
    <usualBoard v-if="false" :slices="slices" />
    <sharedColumn
      :slices="slices"
      :bet-types="betTypes"
      :selected-bet-type="selectedBetType"
      @selectBetType="selectBetType"
      @clearBet="selectBetType(-1)"
    />
    <highcharts
      :slices="slices"
      :selected-spaces="selectedSpaces"
      :wheel-offset="wheelOffset"
      @rotate="rotateWheel"
    />
  </div>
</template>
<script>
import { createSlices } from '../static/slices'
import { createBets } from '../static/bets'
import HighchartsColumn from './HighchartsColumn'
import BetTypeColumn from './BetTypeColumn'
import UsualBoardColumn from './UsualBoardColumn'
import SharedColumn from './SharedColumn'

export default {
  name: 'RouletteWheel',
  components: {
    highcharts: HighchartsColumn,
    betTypes: BetTypeColumn,
    usualBoard: UsualBoardColumn,
    sharedColumn: SharedColumn,
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
        if (this.selectedBetType.type === 'specific') {
          spaces = this.selectedBetType.spaces
        } else if (this.selectedBetType.type === 'straight') {
          const nunmber = parseInt(this.selectedBetType.name[0])
          return this.slices.slice(0, nunmber).map((space) => {
            if (space.number === 100) {
              return '00'
            }
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
          if (betType.type === 'specific') {
            this.slices = createSlices()
          }
        } else {
          betType.selected = false
        }
      })
    },
    rotateWheel(clockwise) {
      if (!clockwise) {
        const tempslice = this.slices.shift()
        this.slices.push(tempslice)
        this.wheelOffset++
      } else {
        const tempslice = this.slices.pop()
        this.slices.unshift(tempslice)
        if (this.wheelOffset > 0) {
          this.wheelOffset--
        } else {
          this.wheelOffset = 37
        }
      }
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
