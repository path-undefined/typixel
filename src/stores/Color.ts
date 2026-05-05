import { defaultPalettes } from "@/services/ColorPalettes";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type ColorState = {
  allPalettes: string[][]
  currentPaletteIndex: number
  currentColor: string
};

export const useColor = defineStore("color", () => {
  const state = ref<ColorState>({
    currentColor: "",
    currentPaletteIndex: 0,
    allPalettes: defaultPalettes,
  });

  const allPalettes = computed(() => state.value.allPalettes);
  const currentPalette = computed(() =>
    state.value.allPalettes[state.value.currentPaletteIndex]!);
  const currentColor = computed(() => state.value.currentColor);

  function init() {
    state.value.allPalettes = defaultPalettes;
    state.value.currentPaletteIndex = 0;
    state.value.currentColor
      = state.value.allPalettes[state.value.currentPaletteIndex]![0]!;
  }

  function setCurrentColor(color: string) {
    state.value.currentColor = color;
  }

  function selectCurrentColor(colorIndex: number) {
    state.value.currentColor
      = currentPalette.value[colorIndex] ?? state.value.currentColor;
  }

  function selectCurrentPalette(paletteIndex: number) {
    state.value.currentPaletteIndex = paletteIndex;
  }

  function movePaletteTo(to: number) {
    const paletteRow = state.value.allPalettes
      .splice(state.value.currentPaletteIndex, 1)[0]!;
    state.value.allPalettes.splice(to, 0, paletteRow);
  }

  function insertPalette() {
    const paletteRow: string[] = [];
    for (let col = 0; col < 10; col++) {
      paletteRow[col] = "";
    }

    state.value.allPalettes
      .splice(state.value.currentPaletteIndex, 0, paletteRow);
  }

  function removePalette() {
    state.value.allPalettes
      .splice(state.value.currentPaletteIndex, 1);
  }

  return {
    state,
    allPalettes,
    currentPalette,
    currentColor,
    init,
    setCurrentColor,
    selectCurrentColor,
    selectCurrentPalette,
    movePaletteTo,
    insertPalette,
    removePalette,
  };
});
