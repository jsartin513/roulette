<template>
  <div>
    <h1 class="m-4 text-center text-xl">Roulette bets</h1>
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
