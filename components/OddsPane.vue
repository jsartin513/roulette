<template>
  <div>
    <h3 class="text-md text-center border-t border-b m-2">Odds</h3>
    <div class="odds">
      <span class="label">Payout: </span>{{ currenntPotentialPayout }}
    </div>
    <div class="odds">
      <span class="label">Likelihood: </span>{{ currentLikelihood }}
    </div>
    <div class="odds">
      <span class="label">Win requirements: </span>{{ currentWinRequiremennts }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'OddsPane',
  props: { selectedBetType: { type: Object, default: null } },
  computed: {
    dollarsBet() {
      return this.selectedBetType.spaces.length
    },
    oddsOnOneSquare() {
      return 35
    },
    currenntPotentialPayout() {
      return `${this.oddsOnOneSquare}:1`
    },
    currentLikelihood() {
      return `${this.dollarsBet.toString()} / 38`
    },
    currentWinRequiremennts() {
      return `Win more than one out of every ${Math.round(
        this.oddsOnOneSquare / this.dollarsBet
      )} bets`
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
</style>
