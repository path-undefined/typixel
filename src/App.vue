<template>
  <div class="app">
    <div class="app__header-area">
      <AppHeader />
    </div>

    <div class="app__status-area">
      <StatusDisplay />
    </div>

    <div class="app__command-area">
      <CommandInput />
    </div>

    <div class="app__canvas-area">
      <PixelCanvas />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import StatusDisplay from "@/components/status-display/StatusDisplay.vue";
import CommandInput from "@/components/CommandInput.vue";
import PixelCanvas from "@/components/PixelCanvas.vue";
</script>

<style lang="scss" scoped>
.app {
  display: grid;
  grid-template-columns: 300px minmax(500px, 1fr);
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:
    "header  canvas"
    "status  canvas"
    "command canvas";
  gap: t.size(2);

  padding: t.size(2);
  width: 100vw;
  height: 100vh;

  color: t.$color-w-0;
  background-color: t.$color-g-1;

  overflow: hidden;

  &__header-area {
    grid-area: header;
  }

  &__status-area {
    grid-area: status;
  }

  &__command-area {
    grid-area: command;
  }

  &__canvas-area {
    grid-area: canvas;
  }

  &__header-area,
  &__status-area,
  &__command-area,
  &__canvas-area {
    border-radius: t.$border-radius;
    background-color: t.$color-g-2;
  }
}
</style>
