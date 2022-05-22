<template>
  <div class="column flex-1">
    <h2 class="text-lg text-center border-b-2 mt-2 mb-4">Betting</h2>
    <ul class="panels">
      <li
        v-for="(panel, index) in allPanels"
        :key="index"
        :class="`panel ${panel.active && 'active-panel'}`"
        @click="selectTab(index)"
      >
        {{ panel.title }}
      </li>
    </ul>
    <div class="text-med border-t-2 border-b-2 border-dashed text-right py-2 mb-2">
      <button class="border-2 rounded-lg py-2 px-8" @click="$emit('clearBet')">
        Clear Bet
      </button>
    </div>
    <usualBoardPane v-if="showUsualBoardPane" :slices="slices" />
    <div v-if="showBettingPane">
      <betTypePane
        :bet-types="betTypes"
        :selected-bet-type="selectedBetType"
        @selectBetType="selectBet"
      />
      <betDescriptorPane
        v-if="canShowDescription"
        :bet-description="selectedBetType.description"
      />
      <oddsPane v-if="canComputePayout" :selected-bet-type="selectedBetType" />
      <noSelectedBetPane v-if="selectedBetType === null" />
      <betLackingInfoPane
        v-for="missingType in missingTypes"
        :key="missingType"
        :info-missing="missingType"
        :bet-name="selectedBetType.name"
      />
    </div>
  </div>
</template>
<script>
import UsualBoardPane from './UsualBoardPane'
import OddsPane from './OddsPane'
import BetDescriptorPane from './BetDescriptorPane'
import BetTypePane from './BetTypePane'
import NoSelectedBetPane from './NoSelectedBetPane'
import BetLackingInfoPane from './BetLackingInfoPane'

export default {
  name: 'SharedColumn',
  components: {
    usualBoardPane: UsualBoardPane,
    oddsPane: OddsPane,
    betDescriptorPane: BetDescriptorPane,
    betTypePane: BetTypePane,
    noSelectedBetPane: NoSelectedBetPane,
    betLackingInfoPane: BetLackingInfoPane,
  },
  props: {
    slices: { type: Array, default: null },
    betTypes: { type: Array, default: null },
    selectedBetType: { type: Object, default: null },
  },
  data() {
    return {
      allPanels: [
        { title: 'normal board', active: true },
        { title: 'special bets', active: false },
      ],
    }
  },
  computed: {
    showUsualBoardPane() {
      return this.allPanels[0].active === true
    },
    showBettingPane() {
      return this.allPanels[1].active === true
    },
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
      return this.selectedBetType && this.selectedBetType.type
    },
    canShowDescription() {
      return this.selectedBetType && this.selectedBetType.description
    },
    missingTypes() {
      if (this.selectedBetType == null) {
        return []
      }
      const missingTypes = []
      if (!this.canComputePayout) {
        missingTypes.push('Odds and Payout')
      }
      if (!this.canShowDescription) {
        missingTypes.push('Description')
      }
      return missingTypes
    },
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i

      // loop over all the tabs
      this.allPanels.forEach((tab, index) => {
        tab.active = index === i
      })
    },
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
  ul.panels {
    display: block;
    list-style: none;
    margin: 0 0 0 20px;
    padding: 0;
  }

  ul.panels > li {
    padding: 15px 30px;
    border-radius: 10px;
    border-color: darkgreen;
    background-color: lightgray;
    margin: 0;
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
  }

  ul.panels > li.active-panel {
    font-weight: bold;
    border-radius: 10px 10px 0 0;
    border-bottom: 8px solid transparent;
  }

</style>