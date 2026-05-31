import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildSelectColorCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "select-color",
    method: (params: string[]): CommandResult => {
      let colorIndex = Number(params[0]);
      const delta = params[1];

      if (delta === "delta") {
        colorIndex += ctx.color.selectedColorIndex;
      }

      if (colorIndex < 0) {
        colorIndex = 0;
      }
      if (colorIndex >= 10) {
        colorIndex = 9;
      }

      ctx.color.selectColor(colorIndex);

      ctx.tool.setInfoStatus("EDIT");

      return {
        successful: true,
      };
    },
  };
}
