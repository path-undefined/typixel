import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildSelectColorCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "select-color",
    method: (params: string[]): CommandResult => {
      const colorIndex = Number(params[0]);

      if (colorIndex < 0 || colorIndex >= 10) {
        return {
          successful: false,
          message: "Column index out of range",
        };
      }

      ctx.color.selectColor(colorIndex);

      return {
        successful: true,
      };
    },
  };
}
