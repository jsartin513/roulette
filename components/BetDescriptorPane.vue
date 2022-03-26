<template>
  <div>
    <h3 class="text-md text-center border-t border-b m-2">Description</h3>
    <div class="description">
      <span class="label">Description: </span>{{ currenntDescription }}
    </div>
    <div class="description">
      <span class="label">Specifics: </span>{{ currentSpecifics }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'BetDescriptorPane',
  props: { betDescription: { type: Object, default: null } },
  computed: {
    currenntDescription() {
      return this.betDescription.primary || ''
    },
    currentSpecifics() {
      return this.betDescription.secondary || ''
    },
  },
}
</script>
<style scoped>
.description {
  margin-left: 0.5em;
}

.label {
  font-weight: 800;
  padding-right: 0.5em;
}
</style>
