import { defineStore } from "pinia";
import { computed, ref } from "vue";

type ColorState = {
  allPalettes: string[][]
  selectedPaletteIndex: number
  selectedColorIndex: number
  currentColor: string
};

export const useColor = defineStore("color", () => {
  const state = ref<ColorState>({
    currentColor: "",
    selectedColorIndex: 0,
    selectedPaletteIndex: 0,
    allPalettes: [],
  });

  const allPalettes = computed(() => state.value.allPalettes);
  const selectedPalette = computed(() =>
    state.value.allPalettes[state.value.selectedPaletteIndex]!);
  const selectedColor = computed(() =>
    state.value.allPalettes[
      state.value.selectedPaletteIndex
    ]![
      state.value.selectedColorIndex
    ]!,
  );
  const currentColorInUse = computed(() => state.value.currentColor);

  function init() {
    state.value.allPalettes = [["#000000", "#ffffff"]];
    state.value.selectedPaletteIndex = 0;
    state.value.selectedColorIndex = 0;
    state.value.currentColor
      = state.value.allPalettes[0]![0]!;
  }

  function setCurrentColorInUse(color: string) {
    state.value.currentColor = color;
  }

  function selectColor(colorIndex: number) {
    state.value.selectedColorIndex = colorIndex;
    state.value.currentColor = selectedPalette.value[colorIndex]!;
  }

  function selectPalette(paletteIndex: number) {
    state.value.selectedPaletteIndex = paletteIndex;
  }

  function movePaletteTo(to: number) {
    const paletteRow = state.value.allPalettes
      .splice(state.value.selectedPaletteIndex, 1)[0]!;
    state.value.allPalettes.splice(to, 0, paletteRow);
  }

  function insertPalette() {
    const paletteRow: string[] = [];
    for (let col = 0; col < 10; col++) {
      paletteRow[col] = "";
    }

    state.value.allPalettes
      .splice(state.value.selectedPaletteIndex, 0, paletteRow);
  }

  function removePalette() {
    state.value.allPalettes
      .splice(state.value.selectedPaletteIndex, 1);
  }

  return {
    state,
    allPalettes,
    selectedPalette,
    selectedColor,
    currentColorInUse,
    init,
    setCurrentColorInUse,
    selectColor,
    selectPalette,
    movePaletteTo,
    insertPalette,
    removePalette,
  };
});
