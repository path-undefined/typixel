import type { CommandContext, CommandMethod, CommandResult } from "./Command.type";

export function buildSelectColorCommand(ctx: CommandContext): CommandMethod {
  return (params: string[]): CommandResult => {
    const row = Number(params[0]);
    const col = Number(params[1]);

    if (row < 0 || row > ctx.color.palettes.length - 1) {
      return {
        successful: false,
        message: "Palette index out of range",
      };
    }

    if (col < 0 || col >= 10) {
      return {
        successful: false,
        message: "Column index out of range",
      };
    }

    ctx.color.selectColor(row, col);

    return {
      successful: true,
    };
  };
}
