<template>
  <div>
    <h3 class="text-md text-center border-t border-b m-2">{{ infoMissing }}</h3>
    <p>Bet <span class="font-extrabold">
      {{ betName.toLowerCase() }}
    </span> is missing {{ infoMissing.toLowerCase() }} information</p>
  </div>
</template>

<script>
export default {
  name: 'BetLackingInfoPane',
  props: {
    infoMissing: { type: String },
    betName: { type: String },
  },
}
</script>
