import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildCreateCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "create",
    method: (params: string[]): CommandResult => {
      const w = Number(params[0]);
      const h = Number(params[1]);

      if (!w || !h) {
        return {
          successful: false,
          message: "Invalid parameters",
        };
      }

      if (w < 0 || w > 300 || h < 0 || h > 200) {
        return {
          successful: false,
          message: "Invalid size",
        };
      }

      ctx.canvas.init([w, h]);
      ctx.color.init();
      ctx.tool.init();
      ctx.viewport.init();

      return {
        successful: true,
      };
    },
  };
}
