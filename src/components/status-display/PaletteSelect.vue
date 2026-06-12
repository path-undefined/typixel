<template>
  <div class="palette-select">
    <div class="palette-select__title">
      Palettes
    </div>

    <ul class="palette-select__list">
      <li
        v-for="(p, index) of color.allPalettes"
        :key="index"
        class="palette-select__item"
        :class="{
          'palette-select__item--active': p === color.selectedPalette
        }"
      >
        [{{ (index + 1) % 10 }}]
        <ColorCubeList :colors="p" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useColor } from "@/stores/Color";
import ColorCubeList from "./ColorCubeList.vue";

const color = useColor();
</script>

<style lang="scss" scoped>
.palette-select {
  &__title {
    font-size: 120%;
    font-weight: bold;
  }

  &__list {
    margin-top: 4px;
  }

  &__item {
    &--active {
      color: t.$color-p-0;
      font-weight: bolder;
    }
  }
}
</style>
