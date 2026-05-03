import type { CommandContext, CommandMethod, CommandResult } from "./Command.type";

export function buildDrawPixelCommand(ctx: CommandContext): CommandMethod {
  return (): CommandResult => {
    const cursor = ctx.tool.cursor;
    const color = ctx.color.color;

    ctx.canvas.setPixel(cursor[0], cursor[1], color);

    return {
      successful: true,
    };
  };
}
