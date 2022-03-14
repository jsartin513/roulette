<template>
  <div :class="`${color} slice`">
    {{ checkedNumber(number) }}
  </div>
</template>

<script>
export default {
  name: 'RouletteSlice',
  props: {
    number: Number,
    color: String,
  },
  methods: {
    checkedNumber(num) {
      if (num === 100) {
        return '00'
      }
      return num
    },
  },
}
</script>

<style scoped>
.black {
  @apply bg-black;
  @apply text-white;
}
.red {
  background-color: red;
  color: white;
}
.green {
  background-color: green;
  color: white;
}
</style>
