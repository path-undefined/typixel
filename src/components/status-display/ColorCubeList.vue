<template>
  <div class="color-cube-list">
    <ColorCube
      v-for="c in colors"
      :key="c"
      class="color-cube-list__cube"
      :color="c"
    />
  </div>
</template>

<script setup lang="ts">
import ColorCube from "./ColorCube.vue";

export type ColorCubeProps = {
  colors: string[]
};

const { colors } = defineProps<ColorCubeProps>();
</script>

<style lang="scss" scoped>
.color-cube-list {
  display: inline-block;
  align-items: center;

  &__cube {
    margin-right: 2px;
  }
}
</style>
