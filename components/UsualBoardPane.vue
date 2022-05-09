<template>
  <div>
    <h3>Normal Board</h3>
    <div class="outer-board grid grid-cols-13 gap-0">
      <div class="zero-column grid grid-rows-12">
        <div class="board-space row-span-3 green-space">0</div>
        <div class="board-space row-span-3 green-space">00</div>
      </div>
      <div class="inner-board col-span-12 grid grid-cols-12 gap-0">
        <div
          v-for="(space, index) in orderedSpaces"
          :key="index"
          :class="`board-space ${space.color}`"
        >
          {{ space.number }}
        </div>
        <div class="board-space col-span-4 background">First 12</div>
        <div class="board-space col-span-4 background">Middle 12</div>
        <div class="board-space col-span-4 background">Highest 12</div>
        <div class="board-space col-span-6 red">Red</div>
        <div class="board-space col-span-6 black">Black</div>
        <div class="board-space col-span-6 background">1-18</div>
        <div class="board-space col-span-6 background">19-36</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UsualBoardPane',
  props: {
    slices: { type: Array, default: null },
  },
  computed: {
    sortedSpaces() {
      const spaces = [...this.slices.filter((slice) => slice.color !== 'green')]
      return spaces.sort(this.sortingSpaces)
    },
    orderedSpaces() {
      const spaces = [...this.sortedSpaces]
      const orderedSpaces = []
      spaces.forEach((space, index) => {
        if (space.number % 3 === 0) {
          orderedSpaces.push(space)
        }
      })
      spaces.forEach((space) => {
        if (space.number % 3 === 2) {
          orderedSpaces.push(space)
        }
      })
      spaces.forEach((space) => {
        if (space.number % 3 === 1) {
          orderedSpaces.push(space)
        }
      })
      return orderedSpaces
    },
  },
  methods: {
    sortingSpaces(spaceA, spaceB) {
      const num1 = spaceA.number - 1
      const num2 = spaceB.number - 1
      if (num1 % 3 === num2 % 3) {
        return num1 - num2
      } else {
        return (num1 % 3) - (num2 % 3)
      }
    },
  },
}
</script>

<style scoped>
.board-space {
  padding: 1em;
  border-radius: 1em;
  text-align: center;
  border-style: dotted;
  border-width: 1px;
  font-weight: 400;
  overflow: clip;
}

.black {
  @apply bg-black;
  @apply text-white;
}
.red {
  background-color: red;
  color: white;
}
.green-space {
  background-color: green;
  color: white;
  padding: 1em 0.5em;
}
.background {
  background-color: darkgreen;
  color: lightgray;
}
.selectable-bet {
  border-style: solid;
  font-weight: 600;
  border-width: 2px;
}
.selected-bet {
  border-style: dashed;
}

.grid-cols-13 {
  grid-template-columns: repeat(13, minmax(0, 1fr));
}
.grid-rows-12 {
  grid-template-rows: repeat(12, minmax(0, 1fr));
}
</style>
