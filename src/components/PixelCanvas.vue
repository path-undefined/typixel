<template>
  <div class="pixel-canvas">
    <canvas
      ref="canvas"
      class="pixel-canvas__canvas"
    />
  </div>
</template>

<style lang="scss" scoped>
.pixel-canvas {
  border-radius: t.$border-radius;
  width: 100%;
  height: 100%;
  background-color: t.$color-g1-2;
  overflow: hidden;

  &__canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
