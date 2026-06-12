<template>
  <div class="layer-select">
    <div class="layer-select__title">
      Layers
    </div>

    <ul class="layer-select__list">
      <li
        v-for="(l, index) of reversedLayers"
        :key="index"
        class="layer-select__item"
        :class="{
          'layer-select__item--active':
            reversedLayers.length - 1 - index
            === canvas.state.currentLayerIndex,
        }"
      >
        <span
          class="layer-select__item-index"
          :class="{
            'layer-select__item-index--inactive':
              reversedLayers.length - index > 10,
          }"
        >
          {{
            reversedLayers.length - index <= 10
              ? `[${(reversedLayers.length - index) % 10}]`
              : `${reversedLayers.length - 1 - index }.`
          }}
        </span>
        {{ l.name }} {{ l.visible ? '' : '[HIDDEN]' }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCanvas } from "@/stores/Canvas";
import { computed } from "vue";

const canvas = useCanvas();

const reversedLayers = computed(() => [...canvas.allLayers].reverse());
</script>

<style lang="scss" scoped>
.layer-select {
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

  &__item-index {
    &--inactive {
      color: t.$color-g-5;
    }
  }
}
</style>
