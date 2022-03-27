<template>
  <div>
    <h1 class="m-4 text-center text-xl border-b-4">Roulette bets</h1>
    <roulette-bet-viewer />
  </div>
</template>

<script>
import RouletteBetViewer from '../components/RouletteBetViewer'

export default {
  name: 'IndexPage',
  components: { RouletteBetViewer },
}
</script>

<style>
button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
</style>
