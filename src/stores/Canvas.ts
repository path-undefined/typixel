import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type CanvasState = {
  allLayers: Layer[]
  currentLayerIndex: number
  size: [number, number]
  dirty: boolean
};

export type Layer = {
  name: string
  visible: boolean
  buffer: Uint32Array
};

export const useCanvas = defineStore("canvas", () => {
  const state = ref<CanvasState>({
    allLayers: [],
    currentLayerIndex: -1,
    size: [0, 0],
    dirty: true,
  });

  const allLayers = computed(() => state.value.allLayers);
  const currentLayerIndex = computed(() => state.value.currentLayerIndex);
  const currentLayer = computed(() =>
    state.value.allLayers[state.value.currentLayerIndex] ?? null);
  const size = computed(() => state.value.size);
  const dirty = computed(() => state.value.dirty);

  function init(size: [number, number]) {
    const [w, h] = size;

    const buffer = new Uint32Array(w * h);

    for (let i = 0; i < w * h; i++) {
      buffer[i] = 0;
    }

    state.value.allLayers = [{
      name: "Untitled Layer",
      visible: true,
      buffer,
    }];
    state.value.currentLayerIndex = 0;
    state.value.size = size;
    state.value.dirty = true;
  }

  function selectLayer(layerIndex: number) {
    state.value.currentLayerIndex = layerIndex;
  }

  function moveLayerTo(to: number) {
    const layer = state.value.allLayers
      .splice(state.value.currentLayerIndex, 1)[0]!;
    state.value.allLayers.splice(to, 0, layer);
    state.value.dirty = true;
  }

  function insertLayer(name: string) {
    const [w, h] = size.value;

    const buffer = new Uint32Array(w * h);

    for (let i = 0; i < w * h; i++) {
      buffer[i] = 0;
    }

    const layer: Layer = {
      name,
      visible: true,
      buffer,
    };

    state.value.allLayers.splice(state.value.currentLayerIndex + 1, 0, layer);
    state.value.currentLayerIndex = state.value.currentLayerIndex + 1;
    state.value.dirty = true;
  }

  function renameLayer(newName: string) {
    state.value.allLayers[state.value.currentLayerIndex]!.name = newName;
  }

  function toggleLayerVisibility() {
    state.value.allLayers[state.value.currentLayerIndex]!.visible
      = !state.value.allLayers[state.value.currentLayerIndex]!.visible;

    state.value.dirty = true;
  }

  function removeLayer() {
    state.value.allLayers.splice(state.value.currentLayerIndex, 1);

    if (state.value.currentLayerIndex >= state.value.allLayers.length) {
      state.value.currentLayerIndex = state.value.allLayers.length - 1;
    }

    state.value.dirty = true;
  }

  function setPixel(pos: [number, number], color: string) {
    const hex = color.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const u32 = (255 << 24) | (b << 16) | (g << 8) | r;

    currentLayer.value!.buffer[pos[1] * size.value[0] + pos[0]] = u32;

    state.value.dirty = true;
  }

  function getPixel(pos: [number, number]): string | null {
    const layer = [...state.value.allLayers].reverse()
      .find((l) =>
        l.visible
        && l.buffer[pos[1] * size.value[0] + pos[0]] !== 0)
      ?? null;

    const u32 = layer?.buffer[pos[1] * size.value[0] + pos[0]] ?? 0;

    if (u32 === 0) {
      return null;
    }

    const r = u32 & 0xFF;
    const g = (u32 >> 8) & 0xFF;
    const b = (u32 >> 16) & 0xFF;

    function toHex(c: number) {
      return c.toString(16).padStart(2, "0");
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function unsetPixel(pos: [number, number]) {
    currentLayer.value!.buffer[pos[1] * size.value[0] + pos[0]] = 0;
    state.value.dirty = true;
  }

  function setDirty(dirty: boolean) {
    state.value.dirty = dirty;
  }

  return {
    state,
    allLayers,
    currentLayerIndex,
    currentLayer,
    size,
    dirty,
    init,
    selectLayer,
    moveLayerTo,
    insertLayer,
    renameLayer,
    toggleLayerVisibility,
    removeLayer,
    setPixel,
    getPixel,
    unsetPixel,
    setDirty,
  };
});
