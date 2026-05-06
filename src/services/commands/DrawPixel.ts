import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildDrawPixelCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "draw-pixel",
    method: (): CommandResult => {
      const cursor = ctx.tool.cursor;
      const color = ctx.color.currentColorInUse;

      ctx.canvas.setPixel(cursor[0], cursor[1], color);

      return {
        successful: true,
      };
    },
  };
}
