<template>
  <div class="content">
    <div class="wheel">
      <ul class="roulette-wheel">
        <li
          v-for="slice in slices"
          :key="slice.number"
          :class="`slice color ${slice.color}`"
          :style="{'background-color': slice.color, 'transform': `rotate(${slice.angle}deg)`, 'z-index': slice.z}"
        >
          <span class="number">
            {{ slice.number }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import RouletteSlice from './RouletteSlice'
import { createSlices } from '../static/slices'

export default {
  name: 'RouletteWheel',
  components: {},
  data() {
    return { slices: [] }
  },
  created() {
    this.initSlices()
  },
  methods: {
    initSlices() {
      this.slices = createSlices()
    },
  },
}
</script>

<style scoped>
.content {
  margin: 20px;
}
</style>
<style lang="scss">
@mixin circle($size) {
  content: '';
  background-color: cyan;
  position: absolute;
  border-radius: 50%;
  width: $size;
  height: $size;
  left: calc(50% - #{calc($size / 2)});
  top: calc(50% - #{calc($size / 2)});
}

$wheel: 15em;
.color {
  @include circle($wheel);
  clip: rect(0, $wheel, $wheel, #{calc($wheel / 2)});
  &:after {
    @include circle($wheel);
    background: yellow;
    clip: rect(0, #{calc($wheel / 2)}, $wheel, 0);
    transform: rotate(45deg);
  }
}

.color,
.color:nth-child(n + 20):after {
  clip: rect(0, $wheel, $wheel, #{calc($wheel / 2)});
}
.color:after,
.color:nth-child(n + 20) {
  @include circle($wheel);
  clip: rect(0, #{calc($wheel / 2)}, $wheel, 0);
}

$colors: (
  green black red black red black red black red black red black red black red
    black red black red green red black red black red black red black red black
    red black red black red black red black red black
);
@for $i from 0 to 38 {
  .color:nth-child(#{1 + $i}):after {
    background-color: nth($colors, $i + 1);
    @if $i < 19 {
      transform: rotate(#{calc(180 / 19) * (1 + $i)}deg);
      z-index: #{38-$i};
    } @else {
      transform: rotate(#{calc(180 / 19) * ($i)}deg);
      z-index: #{$i};
    }
  }
}


.slices {
  position: relative;
}
.number {
  // position: relative;
  z-index: 5000;
}
</style>
