import { defineStore } from "pinia";
import { computed, ref } from "vue";

type CanvasState = {
  layers: Layer[]
  layer: number
  size: [number, number]
  colorList: string[]
};

type Layer = {
  name: string
  visible: boolean
  buffer: number[][]
};

export const useCanvas = defineStore("canvas", () => {
  const state = ref<CanvasState>({
    layers: [],
    layer: -1,
    size: [0, 0],
    colorList: [],
  });

  const layers = computed(() => state.value.layers);
  const layer = computed(() => state.value.layers[state.value.layer] ?? null);
  const size = computed(() => state.value.size);
  const colorList = computed(() => state.value.colorList);

  const colorLookup = computed(() => {
    const result: Record<string, number> = {};

    colorList.value.forEach((c, i) => {
      result[c] = i;
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

    state.value.layers = [{
      name: "Utitled Layer",
      visible: true,
      buffer,
    }];
    state.value.layer = 0;
    state.value.size = [w, h];
    state.value.colorList = [];
  }

  function setLayer(layer: Layer) {
    state.value.layers[state.value.layer] = layer;
  }

  function selectLayer(layer: number) {
    state.value.layer = layer;
  }

  function moveLayerTo(to: number) {
    const layer = state.value.layers.splice(state.value.layer, 1)[0]!;
    state.value.layers.splice(to, 0, layer);
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

    state.value.layers.splice(state.value.layer, 0, layer);
  }

  function removeLayer() {
    state.value.layers.splice(state.value.layer, 1);

    if (state.value.layer >= state.value.layers.length) {
      state.value.layer = state.value.layers.length - 1;
    }
  }

  function setPixel(x: number, y: number, color: string) {
    if (!layer.value || !layer.value.buffer[x] || !layer.value.buffer[x][y]) {
      return;
    }

    let colorIndex = colorLookup.value[color];
    if (colorIndex === undefined) {
      state.value.colorList.push(color);
      colorIndex = colorLookup.value[color]!;
    }

    layer.value.buffer[x][y] = colorIndex;
  }

  function unsetPixel(x: number, y: number) {
    if (
      !layer.value
      || layer.value.buffer[x] === undefined
      || layer.value.buffer[x][y] === undefined
    ) {
      return;
    }

    layer.value.buffer[x][y] = -1;
  }

  return {
    state,
    layers,
    layer,
    size,
    colorList,
    init,
    setLayer,
    selectLayer,
    moveLayerTo,
    insertLayer,
    removeLayer,
    setPixel,
    unsetPixel,
  };
});
