import { defaultPalettes } from "@/services/Colors/Palettes";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type ColorState = {
  color: [number, number]
  palettes: string[][]
};

export const useColor = defineStore("color", () => {
  const state = ref<ColorState>({
    color: [0, 0],
    palettes: defaultPalettes,
  });

  const color = computed(() =>
    state.value.palettes[state.value.color[0]]![state.value.color[1]]!);
  const palettes = computed(() => state.value.palettes);

  function init() {
    state.value.color = [0, 0];
    state.value.palettes = defaultPalettes;
  }

  function setColor(colorValue: string) {
    const [row, col] = state.value.color;

    if (
      !state.value.palettes[row]
      || !state.value.palettes[row][col]
    ) {
      return;
    }

    state.value.palettes[row][col] = colorValue;
  }

  function selectColor(row: number, col: number) {
    state.value.color = [row, col];
  }

  function movePaletteTo(to: number) {
    const paletteRow = state.value.palettes.splice(state.value.color[0], 1)[0]!;
    state.value.palettes.splice(to, 0, paletteRow);
  }

  function insertPalette() {
    const paletteRow: string[] = [];
    for (let col = 0; col < 10; col++) {
      paletteRow[col] = "";
    }

    state.value.palettes.splice(state.value.color[0], 0, paletteRow);
  }

  function removePalette() {
    state.value.palettes.splice(state.value.color[0], 1);
  }

  return {
    state,
    color,
    palettes,
    init,
    setColor,
    selectColor,
    movePaletteTo,
    insertPalette,
    removePalette,
  };
});
