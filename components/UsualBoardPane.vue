<template>
  <div>
    <h3>Normal Board</h3>
    <div class="grid grid-cols-12 gap-0">
      <div
        v-for="(space, index) in orderedSpaces"
        :key="index"
        :class="`board-space ${space.color}`"
        @click="selectBet(index)"
      >
        {{ space.number }}
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
      const spaces = [...this.slices.filter((slice) => slice.color !== 'green')];
      return spaces.sort(this.sortingSpaces)
    },
    orderedSpaces() {
      const spaces = [...this.sortedSpaces];
      const orderedSpaces = [];
      spaces.forEach((space, index) => {
        if (space.number % 3 === 0){
          orderedSpaces.push(space)
        }
      })
      spaces.forEach((space) => {
        if (space.number % 3 === 2){
          orderedSpaces.push(space)
        }
      })
      spaces.forEach((space) => {
        if (space.number % 3 === 1){
          orderedSpaces.push(space)
        }
      })
      return orderedSpaces;
    }
  },
  methods: {
    sortingSpaces(spaceA, spaceB){
      const num1 = spaceA.number - 1;
      const num2 = spaceB.number - 1;
      if (num1 % 3 === num2 % 3) {
        return num1 - num2;
      }
      else {
        return num1 % 3 - num2 % 3;
      }

    }
  }
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

.board-space {
  padding: 1em;
  border-radius: 1em;
  text-align: center;
  border-style: dotted;
  border-width: 1px;
  font-weight: 400;
  overflow: clip;
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
</style>