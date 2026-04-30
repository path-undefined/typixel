<template>
  <div class="app">
    <div class="app__canvas-area">
      <PixelCanvas />
    </div>

    <div class="app__status-area">
      <StatusDisplay />
    </div>

    <div class="app__cmd-area">
      <CmdInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import PixelCanvas from "@/components/PixelCanvas.vue";
import StatusDisplay from "@/components/StatusDisplay.vue";
import CmdInput from "@/components/CmdInput.vue";
</script>

<style lang="scss" scoped>
.app {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 1fr min-content;
  grid-template-areas:
    "canvas  status"
    "canvas  cmd";
  gap: 8px;

  padding: 8px;
  width: 100vw;
  height: 100vh;

  color: t.$color-g2-0;
  background-color: t.$color-g1-0;

  overflow: hidden;

  &__canvas-area {
    grid-area: canvas;
  }

  &__status-area {
    grid-area: status;
  }

  &__cmd-area {
    grid-area: cmd;
  }
}
</style>
