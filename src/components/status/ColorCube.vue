<template>
  <span
    v-if="color"
    class="color-cube"
  />
</template>

<script setup lang="ts">
export type ColorCubeProps = {
  color: string | null
};

const { color } = defineProps<ColorCubeProps>();
</script>

<style lang="scss" scoped>
.color-cube {
  display: inline-block;
  border: 1px solid t.$color-g2-0;
  width: 1em;
  height: 1em;
  background-color: v-bind(color);
  transform: translateY(1px);
}
</style>
