import { defineStore } from "pinia";
import { computed, ref } from "vue";

type ViewportState = {
  resolution: [number, number]
  pan: [number, number]
  zoom: number
};

export const useViewport = defineStore("viewport", () => {
  const state = ref<ViewportState>({
    resolution: [0, 0],
    pan: [0, 0],
    zoom: 12,
  });

  const resolution = computed(() => state.value.resolution);
  const pan = computed(() => state.value.pan);
  const zoom = computed(() => state.value.zoom);

  function init() {
    state.value.pan = [0, 0];
    state.value.zoom = 12;
  }

  function setResolution(resolution: [number, number]) {
    state.value.resolution = resolution;
  }

  function setPan(pan: [number, number]) {
    state.value.pan = pan;
  }

  function setZoom(zoom: number) {
    state.value.zoom = zoom;
  }

  return {
    state,
    resolution,
    pan,
    zoom,
    init,
    setResolution,
    setPan,
    setZoom,
  };
});
