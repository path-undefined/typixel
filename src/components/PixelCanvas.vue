<template>
  <div class="pixel-canvas">
    <canvas
      ref="canvas"
      tabindex="0"
      class="pixel-canvas__canvas"
      @keydown="onKeyDown"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watchEffect } from "vue";
import { useCanvas } from "@/stores/Canvas";
import { useColor } from "@/stores/Color";
import { useCommand } from "@/stores/Command";
import { useTool } from "@/stores/Tool";
import { useViewport } from "@/stores/Viewport";

const canvas = useCanvas();
const color = useColor();
const command = useCommand();
const tool = useTool();
const viewport = useViewport();

const canvasElem = useTemplateRef("canvas");

const startRendering = ref(false);
const ctx2d = ref<CanvasRenderingContext2D>(
  null as unknown as CanvasRenderingContext2D,
);

onMounted(() => {
  if (!canvasElem.value) {
    return;
  }

  ctx2d.value = canvasElem.value.getContext("2d")!;

  ctx2d.value.imageSmoothingEnabled = false;
  const dpr = window.devicePixelRatio || 1;
  const canvasRect = canvasElem.value.getBoundingClientRect();

  const resX = dpr * canvasRect.width;
  const resY = dpr * canvasRect.height;

  canvasElem.value.width = resX;
  canvasElem.value.height = resY;

  viewport.setResolution([resX, resY]);

  startRendering.value = true;
});

watchEffect(render);

function render() {
  if (!startRendering.value) {
    return;
  }

  renderBackground();

  if (canvas.layers.length === 0) {
    return;
  }

  for (const layer of canvas.layers) {
    for (let x = 0; x < canvas.size[0]; x++) {
      for (let y = 0; y < canvas.size[1]; y++) {
        const pixelColorIndex = layer.buffer[x]![y]!;

        let pixelColor: string;

        if (pixelColorIndex >= 0) {
          pixelColor = canvas.colorList[pixelColorIndex]!;
        } else {
          pixelColor
            = (Math.floor(x / 2) + Math.floor(y / 2)) % 2 === 0
              ? "#808080"
              : "#a1a1a1";
        }

        renderPixel(x, y, pixelColor);
      }
    }
  }

  renderGrid();
  renderFrame();
  renderCursor();
}

function renderBackground() {
  ctx2d.value.fillStyle = "#5f5f5f";
  ctx2d.value.fillRect(
    0, 0, viewport.resolution[0], viewport.resolution[1],
  );
}

function renderPixel(x: number, y: number, color: string) {
  const [left, top] = bufferToCanvas([x, y]);

  ctx2d.value.fillStyle = color;
  ctx2d.value.fillRect(left, top, viewport.zoom, viewport.zoom);
}

function renderGrid() {
  if (viewport.zoom < 8) {
    return;
  }

  const [left, top] = bufferToCanvas([0, 0]);
  const width = canvas.size[0] * viewport.zoom;
  const height = canvas.size[1] * viewport.zoom;

  ctx2d.value.strokeStyle = "#c3c3c3";
  ctx2d.value.lineWidth = 1;
  ctx2d.value.setLineDash([2, 2]);

  for (let x = 1; x < canvas.size[0]; x++) {
    ctx2d.value.beginPath();
    ctx2d.value.moveTo(left + x * viewport.zoom + 0.5, top + 0.5);
    ctx2d.value.lineTo(left + x * viewport.zoom + 0.5, top + height + 0.5);
    ctx2d.value.stroke();
  }

  for (let y = 1; y < canvas.size[1]; y++) {
    ctx2d.value.beginPath();
    ctx2d.value.moveTo(left + 0.5, top + y * viewport.zoom + 0.5);
    ctx2d.value.lineTo(left + width + 0.5, top + y * viewport.zoom + 0.5);
    ctx2d.value.stroke();
  }

  ctx2d.value.setLineDash([]);
}

function renderFrame() {
  const [left, top] = bufferToCanvas([0, 0]);
  const [right, bottom] = bufferToCanvas(
    [canvas.size[0], canvas.size[1]],
  );

  ctx2d.value.fillStyle = "#333333 ";
  ctx2d.value.fillRect(
    right, top + 4, 4, canvas.size[1] * viewport.zoom,
  );
  ctx2d.value.fillRect(
    left + 4, bottom, canvas.size[0] * viewport.zoom, 4,
  );

  ctx2d.value.strokeStyle = "#1d1d1d";
  ctx2d.value.lineWidth = 1;
  ctx2d.value.strokeRect(
    left + 0.5,
    top + 0.5,
    canvas.size[0] * viewport.zoom,
    canvas.size[1] * viewport.zoom,
  );
}

function renderCursor() {
  const [x, y] = bufferToCanvas([tool.cursor[0], tool.cursor[1]]);

  ctx2d.value.strokeStyle = "#e5e5e5";
  ctx2d.value.lineWidth = 1;
  ctx2d.value.strokeRect(
    x + 0.5, y + 0.5, viewport.zoom, viewport.zoom,
  );

  ctx2d.value.fillStyle = color.color;
  ctx2d.value.fillRect(
    x + Math.floor(viewport.zoom / 10) + 2,
    y + Math.floor(viewport.zoom / 10) + 2,
    viewport.zoom - (Math.floor(viewport.zoom / 10) + 2) * 2 + 1,
    viewport.zoom - (Math.floor(viewport.zoom / 10) + 2) * 2 + 1,
  );
}

function bufferToCanvas(coord: [number, number]): [number, number] {
  const [x, y] = coord;

  const bufferCenterX = canvas.size[0] / 2;
  const bufferCenterY = canvas.size[1] / 2;
  const bufferOffsetX = x - bufferCenterX + viewport.pan[0];
  const bufferOffsetY = y - bufferCenterY + viewport.pan[1];
  const canvasOffsetX = bufferOffsetX * viewport.zoom;
  const canvasOffsetY = bufferOffsetY * viewport.zoom;
  const canvasCenterX = viewport.resolution[0] / 2;
  const canvasCenterY = viewport.resolution[1] / 2;
  const canvasX = Math.round(canvasCenterX + canvasOffsetX);
  const canvasY = Math.round(canvasCenterY + canvasOffsetY);

  return [canvasX, canvasY];
}

function onKeyDown(ev: KeyboardEvent) {
  console.log(ev.key);

  const modifiers = [];

  if (ev.altKey) {
    modifiers.push("Alt");
  }

  if (ev.shiftKey) {
    modifiers.push("Shift");
  }

  if (ev.ctrlKey) {
    modifiers.push("Control");
  }

  const keys = [...modifiers, ev.key];
  const boundCommand = command.getCommand(keys);

  if (boundCommand) {
    ev.preventDefault();

    command.dispatchCommand(boundCommand);
  }
}
</script>

<style lang="scss" scoped>
.pixel-canvas {
  width: 100%;
  height: 100%;
  background-color: t.$color-g1-2;

  &__canvas {
    border-radius: t.$border-radius;
    border: 2px solid transparent;
    width: 100%;
    height: 100%;
    outline: none;

    &:focus {
      border-color: t.$color-p-3;
    }
  }
}
</style>
