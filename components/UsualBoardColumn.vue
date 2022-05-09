<template>
  <div class="column flex-1">
    <h2 class="text-lg text-center border-b-2 mt-2 mb-4">Bet Board</h2>
    <div class="text-med border-b-2 border-dashed text-right pb-2 my-2">
      <button class="border-2 rounded-lg py-2 px-8" @click="$emit('clearBet')">
        Clear
      </button>
    </div>
    <usualBoardPane :slices="slices" />
  </div>
</template>
<script>
import UsualBoardPane from './UsualBoardPane'
export default {
  name: 'UsualBoardColumn',
  components: { usualBoardPane: UsualBoardPane },
  props: {
    slices: { type: Array, default: null },
  },
}
</script>
