import { defineStore } from "pinia";
import { computed, ref } from "vue";

type ImageBufferState = {
  buffer: number[][]
  colorList: string[]
};

export const useImageBuffer = defineStore("image-buffer", () => {
  const state = ref<ImageBufferState>({
    buffer: [],
    colorList: [],
  });

  const buffer = computed(() => state.value.buffer);
  const colorList = computed(() => state.value.colorList);

  const colorLookup = computed(() => {
    const result: Record<string, number> = {};

    colorList.value.forEach((c, i) => {
      result[c] = i;
    });

    return result;
  });

  function initializeBuffer(w: number, h: number) {
    const buffer: number[][] = [];
    for (let x = 0; x < w; x++) {
      const col: number[] = [];
      for (let y = 0; y < h; y++) {
        col.push(-1);
      }

      buffer.push(col);
    }

    state.value.buffer = buffer;
  }

  function setPixel(x: number, y: number, color: string) {
    let colorIndex = colorLookup.value[color];
    if (!colorIndex) {
      state.value.colorList.push(color);
      colorIndex = colorLookup.value[color]!;
    }

    if (!state.value.buffer[x] || !state.value.buffer[x][y]) {
      throw Error("Index out of range");
    }

    state.value.buffer[x][y] = colorIndex;
  }

  function unsetPixel(x: number, y: number) {
    if (!state.value.buffer[x] || !state.value.buffer[x][y]) {
      throw Error("Index out of range");
    }

    state.value.buffer[x][y] = -1;
  }

  return { state, buffer, colorList, initializeBuffer, setPixel, unsetPixel };
});
