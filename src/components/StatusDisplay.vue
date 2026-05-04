<template>
  <div class="status-display">
    <div class="status-display__title">
      Editor Status
    </div>
    <ul
      v-if="canvas.layers.length"
      class="status-display__status-list"
    >
      <li>
        Layer:
        {{ canvas.layer?.name }}
        ({{ canvas.layer?.visible ? "visible" : "invisible" }})
      </li>
      <li>
        Tool:
        {{ tool.tool }}
        ({{ tool.toolStatus }})
      </li>
      <li>
        Color:
        <span
          class="status-display__color-cube"
          :style="{ 'background-color': color.color }"
        />
        {{ color.color }}
      </li>
      <li>
        Cursor:
        [{{ tool.cursor[0] }}, {{ tool.cursor[1] }}]
      </li>
      <li>
        Pixel:
        <span
          v-if="pixel"
          class="status-display__color-cube"
          :style="{ 'background-color': pixel }"
        />
        {{ pixel }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCanvas } from "@/stores/Canvas";
import { useColor } from "@/stores/Color";
import { useTool } from "@/stores/Tool";

const canvas = useCanvas();
const color = useColor();
const tool = useTool();

const pixel = computed(() => {
  const colorIndex
    = canvas.layer?.buffer?.[tool.cursor[0]]?.[tool.cursor[1]] ?? -1;

  if (colorIndex < 0) {
    return "";
  }

  return canvas.colorList[colorIndex];
});
</script>

<style lang="scss" scoped>
.status-display {
  border-radius: t.$border-radius;
  padding: 8px;
  width: 100%;
  height: 100%;

  background-color: t.$color-g1-2;

  &__title {
    font-size: 110%;
    font-weight: bold;
  }

  &__status-list {
    margin-top: 4px;
  }

  &__color-cube {
    display: inline-block;
    border: 1px solid t.$color-g2-0;
    width: 1em;
    height: 1em;
    transform: translateY(1px);
  }
}
</style>
