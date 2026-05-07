<template>
  <div class="editor-status">
    <div class="editor-status__title">
      Editor Status
    </div>
    <ul
      v-if="canvas.allLayers.length"
      class="editor-status__status-list"
    >
      <li>
        Layer:
        {{ canvas.currentLayer?.name }}
        ({{ canvas.currentLayer?.visible ? "visible" : "invisible" }})
      </li>
      <li>
        Tool:
        {{ tool.tool }}
        ({{ tool.toolStatus }})
      </li>
      <li>
        Color:
        <ColorCube :color="color.currentColorInUse" />
        {{ color.currentColorInUse }}
      </li>
      <li>
        Palette:
        <ColorCubeList
          :colors="color.selectedPalette"
          :current-color="color.currentColorInUse"
        />
      </li>
      <li>
        Cursor:
        [{{ tool.cursor[0] }}, {{ tool.cursor[1] }}]
      </li>
      <li>
        Pixel:
        <ColorCube :color="pixel" />
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
import ColorCube from "./ColorCube.vue";
import ColorCubeList from "./ColorCubeList.vue";

const canvas = useCanvas();
const color = useColor();
const tool = useTool();

const pixel = computed(() => canvas.getPixel(tool.cursor));
</script>

<style lang="scss" scoped>
.editor-status {
  &__title {
    font-size: 120%;
    font-weight: bold;
  }

  &__status-list {
    margin-top: 4px;
  }
}
</style>
