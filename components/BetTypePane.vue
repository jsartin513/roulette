<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'BetTypePane',
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
  padding: 0.5em;
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
