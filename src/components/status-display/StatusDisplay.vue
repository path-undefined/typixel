<template>
  <div class="status-display">
    <PaletteSelect v-if="tool.infoStatus === 'PALETTE'" />
    <ColorSelect v-else-if="tool.infoStatus === 'COLOR'" />
    <LayerSelect v-else-if="tool.infoStatus === 'LAYER'" />
    <ToolSelect v-else-if="tool.infoStatus === 'TOOL'" />
    <EditorStatus v-else />
  </div>
</template>

<script setup lang="ts">
import { useTool } from "@/stores/Tool";
import EditorStatus from "./EditorStatus.vue";
import PaletteSelect from "./PaletteSelect.vue";
import ColorSelect from "./ColorSelect.vue";
import LayerSelect from "./LayerSelect.vue";
import ToolSelect from "./ToolSelect.vue";

const tool = useTool();
</script>

<style lang="scss" scoped>
.status-display {
  padding: 8px;
  width: 100%;
  height: 100%;
}
</style>
