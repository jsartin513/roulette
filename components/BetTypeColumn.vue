<template>
  <div class="column">
    <h2 class="text-lg text-center border-t-2 border-b-2 my-2">Bet types</h2>
    <div class="text-med border-b-2 text-right pb-2 my-2">
      <button
        class="border-2 rounded-lg py-2 px-8"
        :disabled="disableClearBet"
        @click="$emit('clearBet')"
      >
        Clear
      </button>
    </div>

    <div class="flex flex-wrap gap-4">
      <div
        v-for="(betType, index) in possibleBetTypes"
        :key="index"
        :class="`bet-type ${betType.selectable && 'selectable-bet'}  ${
          betType.selected && 'selected-bet'
        }`"
        @click="selectBet(index)"
      >
        {{ betType.name }}
      </div>
    </div>
    <betDescriptorPane
      v-if="canShowDescription"
      :bet-description="selectedBetType.description"
    />
    <oddsPane v-if="canComputePayout" :selected-bet-type="selectedBetType" />
  </div>
</template>

<script>
import OddsPane from './OddsPane'
import BetDescriptorPane from './BetDescriptorPane'

export default {
  name: 'BetTypePanel',
  components: { oddsPane: OddsPane, betDescriptorPane: BetDescriptorPane },
  props: {
    betTypes: { type: Array, default: null },
    selectedBetType: { type: Object, default: null },
  },
  computed: {
    disableClearBet() {
      return this.selectedBetType === null
    },
    possibleBetTypes() {
      const allBets = this.betTypes.map((betType) => {
        if (betType.spaces) {
          betType.selectable = true
        } else {
          betType.selectable = false
        }
        return betType
      })
      return allBets
    },
    canComputePayout() {
      return this.selectedBetType && this.selectedBetType.spaces.length > 0
    },
    canShowDescription() {
      return this.selectedBetType && this.selectedBetType.description
    },
  },
  methods: {
    selectBet(index) {
      const selectedBet = this.possibleBetTypes[index]
      if (selectedBet.selectable) {
        this.$emit('selectBetType', index)
      }
    },
  },
}
</script>

<style scoped>
.bet-type {
  padding: 1em;
  width: 25%;
  border-radius: 0.5em;
  text-align: center;
  color: green;
  background-color: lightgray;
  border-style: dotted;
  border-color: black;
  border-width: 1px;
  font-weight: 400;
  overflow: clip;
}
.selectable-bet {
  border-style: solid;
  font-weight: 600;
  border-color: black;
  border-width: 2px;
  background-color: lightgray;
  color: darkgreen;
}
.selected-bet {
  color: white;
  background-color: darkgreen;
  border-color: lightgray;
  border-style: dashed;
}
</style>
