<template>
  <div class="color-select">
    <div class="color-select__title">
      Colors
    </div>

    <ul class="color-select__list">
      <li
        v-for="(c, index) of color.currentPalette"
        :key="c"
        class="color-select__item"
        :class="{
          'color-select__item--active': c === color.currentColor,
        }"
      >
        {{ (index + 1) % 10 }}.
        <ColorCube :color="c" />
        {{ c }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useColor } from "@/stores/Color";
import ColorCube from "./ColorCube.vue";

const color = useColor();
</script>

<style lang="scss" scoped>
.color-select {
  &__title {
    font-size: 110%;
    font-weight: bold;
  }

  &__list {
    margin-top: 4px;
  }

  &__item {
    &--active {
      color: t.$color-p-3;
      font-weight: bolder;
    }
  }
}
</style>
