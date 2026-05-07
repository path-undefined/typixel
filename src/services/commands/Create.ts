import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildCreateCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "create",
    method: (params: string[]): CommandResult => {
      const width = Number(params[0]);
      const height = Number(params[1]);

      if (!width || !height) {
        return {
          successful: false,
          message: "Invalid parameters",
        };
      }

      if (width < 0 || width > 200 || height < 0 || height > 200) {
        return {
          successful: false,
          message: "Invalid size",
        };
      }

      ctx.canvas.init(width, height);
      ctx.color.init();
      ctx.tool.init();
      ctx.viewport.init();

      return {
        successful: true,
      };
    },
  };
}
