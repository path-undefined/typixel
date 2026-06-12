<template>
  <div class="tool-select">
    <div class="tool-select__title">
      Tools
    </div>

    <ul class="tool-select__list">
      <li
        v-for="(t, index) of availableTools"
        :key="t"
        class="tool-select__item"
        :class="{
          'tool-select__item--active': t === tool.tool,
        }"
      >
        [{{ (index + 1) % 10 }}]
        {{ t }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTool, type Tool } from "@/stores/Tool";

const tool = useTool();

const availableTools: Tool[] = [
  "PIXEL",
  "AREA",
  "LINE",
  "CIRCLE",
  "RECT",
];
</script>

<style lang="scss" scoped>
.tool-select {
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
