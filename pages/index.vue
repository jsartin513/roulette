<template>
  <div>
    <h1 class="m-4">Roulette bets</h1>
    <roulette-wheel />
  </div>
</template>

<script>
import RouletteWheel from '../components/HighchartsWheel'

export default {
  name: 'IndexPage',
  components: { RouletteWheel },
}
</script>
