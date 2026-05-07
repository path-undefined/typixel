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

let ctx: CanvasRenderingContext2D
  = null as unknown as CanvasRenderingContext2D;
let dataCanvas
  = null as unknown as OffscreenCanvas;
let dataCtx
  = null as unknown as OffscreenCanvasRenderingContext2D;
let imgData
  = null as unknown as ImageData;

onMounted(() => {
  if (!canvasElem.value) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  const canvasRect = canvasElem.value.getBoundingClientRect();

  const resX = dpr * canvasRect.width;
  const resY = dpr * canvasRect.height;

  canvasElem.value.width = resX;
  canvasElem.value.height = resY;

  ctx = canvasElem.value.getContext("2d")!;
  ctx.imageSmoothingEnabled = false;

  viewport.setResolution([resX, resY]);

  startRendering.value = true;
});

watchEffect(render);

function render() {
  const start = Date.now();
  if (!startRendering.value) {
    return;
  }

  renderBackground();

  if (canvas.allLayers.length === 0) {
    return;
  }

  renderPixels();
  renderGrid();
  renderFrame();
  renderCursor();

  console.log(Date.now() - start);
}

function renderBackground() {
  ctx.fillStyle = "#5f5f5f";
  ctx.fillRect(
    0, 0, viewport.resolution[0], viewport.resolution[1],
  );
}

function renderPixels() {
  if (
    !dataCanvas
    || dataCanvas.width !== canvas.size[0]
    || dataCanvas.height !== canvas.size[1]
  ) {
    dataCanvas = new OffscreenCanvas(canvas.size[0], canvas.size[1]);
    dataCtx = dataCanvas.getContext("2d")!;
    imgData = dataCtx.createImageData(canvas.size[0], canvas.size[1]);
  }

  const [w, h] = canvas.size;
  const colorList = canvas.colorList;
  const buf32 = new Uint32Array(imgData.data.buffer);

  for (const layer of canvas.allLayers) {
    const buffer = layer.buffer;

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const pixelColorIndex = buffer[x]![y]!;

        const imgDataOffset = y * w + x;

        if (pixelColorIndex >= 0) {
          const pixelColor = colorList[pixelColorIndex]!;
          buf32[imgDataOffset] = pixelColor.u32;
        } else {
          if (((x >> 2) + (y >> 2)) % 2 === 0) {
            buf32[imgDataOffset] = 0xFF808080;
          } else {
            buf32[imgDataOffset] = 0xFFA1A1A1;
          }
        }
      }
    }
  }

  const [left, top] = bufferToCanvas([0, 0]);
  const width = canvas.size[0] * viewport.zoom;
  const height = canvas.size[1] * viewport.zoom;

  dataCtx.putImageData(imgData, 0, 0);
  const bitmap = dataCanvas.transferToImageBitmap();
  ctx.drawImage(bitmap, left, top, width, height);
  bitmap.close();
}

function renderGrid() {
  if (viewport.zoom < 8) {
    return;
  }

  const [left, top] = bufferToCanvas([0, 0]);
  const width = canvas.size[0] * viewport.zoom;
  const height = canvas.size[1] * viewport.zoom;

  ctx.strokeStyle = "#c3c3c3";
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);

  for (let x = 1; x < canvas.size[0]; x++) {
    ctx.beginPath();
    ctx.moveTo(left + x * viewport.zoom + 0.5, top + 0.5);
    ctx.lineTo(left + x * viewport.zoom + 0.5, top + height + 0.5);
    ctx.stroke();
  }

  for (let y = 1; y < canvas.size[1]; y++) {
    ctx.beginPath();
    ctx.moveTo(left + 0.5, top + y * viewport.zoom + 0.5);
    ctx.lineTo(left + width + 0.5, top + y * viewport.zoom + 0.5);
    ctx.stroke();
  }

  ctx.setLineDash([]);
}

function renderFrame() {
  const [left, top] = bufferToCanvas([0, 0]);
  const [right, bottom] = bufferToCanvas(
    [canvas.size[0], canvas.size[1]],
  );

  ctx.fillStyle = "#333333 ";
  ctx.fillRect(
    right, top + 4, 4, canvas.size[1] * viewport.zoom,
  );
  ctx.fillRect(
    left + 4, bottom, canvas.size[0] * viewport.zoom, 4,
  );

  ctx.strokeStyle = "#1d1d1d";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    left + 0.5,
    top + 0.5,
    canvas.size[0] * viewport.zoom,
    canvas.size[1] * viewport.zoom,
  );
}

function renderCursor() {
  const [x, y] = bufferToCanvas([tool.cursor[0], tool.cursor[1]]);

  const pci = canvas.currentLayer!.buffer[tool.cursor[0]]![tool.cursor[1]]!;
  const pc = canvas.colorList[pci] ?? { r: 0, g: 0, b: 0, hex: "#000000" };

  const yiq = (
    (pc.r * 299) + (pc.g * 587) + (pc.b * 114)) / 1000;

  ctx.strokeStyle = (yiq >= 128) ? "#000000" : "#ffffff";
  ctx.lineWidth = 1;
  ctx.strokeRect(
    x + 0.5, y + 0.5, viewport.zoom, viewport.zoom,
  );

  ctx.fillStyle = color.currentColorInUse;
  ctx.fillRect(
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
  const commandExecuted = command.executeCommandByKeyBinding(keys);

  if (commandExecuted) {
    ev.preventDefault();
  }
}
</script>

<style lang="scss" scoped>
.pixel-canvas {
  border-radius: t.$border-radius;
  width: 100%;
  height: 100%;
  background-color: t.$color-g1-6;

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
