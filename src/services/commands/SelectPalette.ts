import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildSelectPaletteCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "select-palette",
    method: (params: string[]): CommandResult => {
      const paletteIndex = Number(params[0]);

      if (paletteIndex < 0 || paletteIndex > ctx.color.allPalettes.length - 1) {
        return {
          successful: false,
          message: "Palette index out of range",
        };
      }

      ctx.color.selectCurrentPalette(paletteIndex);

      return {
        successful: true,
      };
    },
  };
}
