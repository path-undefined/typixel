import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildErasePixelCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "erase-pixel",
    method: (): CommandResult => {
      const cursor = ctx.tool.cursor;

      ctx.canvas.unsetPixel(cursor[0], cursor[1]);

      return {
        successful: true,
      };
    },
  };
}
