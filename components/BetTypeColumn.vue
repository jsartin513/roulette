<template>
  <div class="column">
    <h2 class="text-lg text-center border-b-2 mt-2 mb-4">Bet types</h2>
    <div class="text-med border-b-2 border-dashed text-right pb-2 my-2">
      <button
        class="border-2 rounded-lg py-2 px-8"
        :disabled="disableClearBet"
        @click="$emit('clearBet')"
      >
        Clear
      </button>
    </div>

    <div class="flex flex-wrap gap-4 mt-4">
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
    <noSelectedBetPane v-if="selectedBetType === null" />
    <betLackingInfoPane v-for="missingType in missingTypes" :key="missingType" :infoMissing="missingType" :betName="selectedBetType.name" />
  </div>
</template>

<script>
import OddsPane from './OddsPane'
import BetDescriptorPane from './BetDescriptorPane'
import NoSelectedBetPane from './NoSelectedBetPane'
import BetLackingInfoPane from './BetLackingInfoPane'

export default {
  name: 'BetTypePanel',
  components: {
    oddsPane: OddsPane,
    betDescriptorPane: BetDescriptorPane,
    noSelectedBetPane: NoSelectedBetPane,
    betLackingInfoPane: BetLackingInfoPane
  },
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
    missingTypes() {
      if (this.selectedBetType == null){
        return []
      }
      const missingTypes = []
      if (!this.canComputePayout) {
        missingTypes.push('Odds and Payout')
      }
      if (!this.canShowDescription) {
        missingTypes.push('Description')
      }
      return missingTypes;
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
