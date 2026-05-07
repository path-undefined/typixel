import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildErasePixelCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "erase-pixel",
    method: (): CommandResult => {
      const cursor = ctx.tool.cursor;

      ctx.canvas.unsetPixel(cursor);

      return {
        successful: true,
      };
    },
  };
}
