<template>
  <div class="column">
    <h2 class="text-lg text-center border-t-2 border-b-2">
      Bet types
    </h2>
    <div class="flex flex-wrap m-2">
      <div
        v-for="(betType, index) in betTypes"
        :key="index"
        :class="`bet-type ${betType.selected && 'selected-bet'}`"
        @click="$emit('selectBetType', index)"
      >
        {{ betType.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BetTypePanel',
  props: { betTypes: { type: Array, default: null } },
}
</script>

<style scoped>
.bet-type {
  padding: 1em;
  margin: 1em;
  width: 25%;
  border-radius: 0.5em;
  text-align: center;
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