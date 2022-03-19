<template>
  <div class="column">
    <h2 class="text-lg text-center border-t-2 border-b-2">Bet types</h2>
    <div class="flex flex-wrap m-2">
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
    <div>
      <h3 class="text-md text-center border-t border-b m-2">Odds</h3>
      <div class="odds">
        <span class="label">Payout: </span>{{ currenntPotentialPayout }}
      </div>
      <div class="odds">
        <span class="label">Likelihood: </span>{{ currentLikelihood }}
      </div>
      <div class="odds">
        <span class="label">Win requirements: </span
        >{{ currentWinRequiremennts }}
      </div>
      <p class="odds">How does this work? Lorem ipsum and whatnot.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BetTypePanel',
  props: {
    betTypes: { type: Array, default: null },
    selectedBetType: { type: Object, default: null },
  },
  computed: {
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
      return this.selectedBetType && this.selectedBetType.spaces.length > 0;
    },
    dollarsBet() {
      return this.selectedBetType.spaces.length;
    },
    oddsOnOneSquare(){
      return 35;
    },
    currenntPotentialPayout() {
      if (this.canComputePayout) {
        return `${this.oddsOnOneSquare}:1`
      }
      return ''
    },
    currentLikelihood() {
      if (this.canComputePayout) {
        return `${this.dollarsBet.toString()} / 38`;
      }
      return ''
    },
    currentWinRequiremennts() {
      if (this.canComputePayout) {
        return `Win more than one out of every ${Math.round(this.oddsOnOneSquare / this.dollarsBet)} bets`
      }
      return ''
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
.odds {
  margin-left: 0.5em;
}

.label {
  font-weight: 800;
  padding-right: 0.5em;
}

.bet-type {
  padding: 1em;
  margin: 1em;
  width: 25%;
  border-radius: 0.5em;
  text-align: center;
  color: green;
  background-color: lightgray;
  border-style: dotted;
  border-color: black;
  border-width: 1px;
  font-weight: 400;
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
