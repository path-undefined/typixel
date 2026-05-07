import { defineStore } from "pinia";
import { computed, ref } from "vue";

type CanvasState = {
  allLayers: Layer[]
  currentLayerIndex: number
  size: [number, number]
  colorList: Color[]
};

type Layer = {
  name: string
  visible: boolean
  buffer: number[][]
};

type Color = {
  r: number
  g: number
  b: number
  hex: string
};

export const useCanvas = defineStore("canvas", () => {
  const state = ref<CanvasState>({
    allLayers: [],
    currentLayerIndex: -1,
    size: [0, 0],
    colorList: [],
  });

  const allLayers = computed(() => state.value.allLayers);
  const currentLayer = computed(() =>
    state.value.allLayers[state.value.currentLayerIndex] ?? null);
  const size = computed(() => state.value.size);
  const colorList = computed(() => state.value.colorList);

  const colorLookup = computed(() => {
    const result: Record<string, number> = {};

    colorList.value.forEach((c, i) => {
      result[c.hex] = i;
    });

    return result;
  });

  function init(w: number, h: number) {
    const buffer: number[][] = [];
    for (let x = 0; x < w; x++) {
      const col: number[] = [];
      for (let y = 0; y < h; y++) {
        col.push(-1);
      }

      buffer.push(col);
    }

    state.value.allLayers = [{
      name: "Untitled Layer",
      visible: true,
      buffer,
    }];
    state.value.currentLayerIndex = 0;
    state.value.size = [w, h];
    state.value.colorList = [];
  }

  function selectLayer(layerIndex: number) {
    state.value.currentLayerIndex = layerIndex;
  }

  function moveLayerTo(to: number) {
    const layer = state.value.allLayers
      .splice(state.value.currentLayerIndex, 1)[0]!;
    state.value.allLayers.splice(to, 0, layer);
  }

  function insertLayer() {
    const buffer: number[][] = [];
    for (let x = 0; x < size.value[0]; x++) {
      const col: number[] = [];
      for (let y = 0; y < size.value[1]; y++) {
        col.push(-1);
      }

      buffer.push(col);
    }

    const layer: Layer = {
      name: "New Layer",
      visible: true,
      buffer,
    };

    state.value.allLayers.splice(state.value.currentLayerIndex, 0, layer);
  }

  function removeLayer() {
    state.value.allLayers.splice(state.value.currentLayerIndex, 1);

    if (state.value.currentLayerIndex >= state.value.allLayers.length) {
      state.value.currentLayerIndex = state.value.allLayers.length - 1;
    }
  }

  function setPixel(x: number, y: number, color: string) {
    if (
      !currentLayer.value
      || currentLayer.value.buffer[x] === undefined
      || currentLayer.value.buffer[x][y] === undefined) {
      return;
    }

    let colorIndex = colorLookup.value[color];

    if (colorIndex === undefined) {
      const hex = color.replace("#", "");

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      state.value.colorList.push({ r, g, b, hex: color });
      colorIndex = colorLookup.value[color]!;
    }

    currentLayer.value.buffer[x][y] = colorIndex;
  }

  function unsetPixel(x: number, y: number) {
    if (
      !currentLayer.value
      || currentLayer.value.buffer[x] === undefined
      || currentLayer.value.buffer[x][y] === undefined
    ) {
      return;
    }

    currentLayer.value.buffer[x][y] = -1;
  }

  return {
    state,
    allLayers,
    currentLayer,
    size,
    colorList,
    init,
    selectLayer,
    moveLayerTo,
    insertLayer,
    removeLayer,
    setPixel,
    unsetPixel,
  };
});
