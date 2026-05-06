import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildSelectPaletteAndColorCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "select-palette-and-color",
    method: (params: string[]): CommandResult => {
      const paletteIndex = Number(params[0]);
      const colorIndex = Number(params[1]);

      if (paletteIndex < 0 || paletteIndex > ctx.color.allPalettes.length - 1) {
        return {
          successful: false,
          message: "Palette index out of range",
        };
      }

      if (colorIndex < 0 || colorIndex >= 10) {
        return {
          successful: false,
          message: "Column index out of range",
        };
      }

      ctx.color.selectPalette(paletteIndex);
      ctx.color.selectColor(colorIndex);

      return {
        successful: true,
      };
    },
  };
}
