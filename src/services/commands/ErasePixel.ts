import type { CommandContext, CommandMethod, CommandResult } from "./Command.type";

export function buildErasePixelCommand(ctx: CommandContext): CommandMethod {
  return (): CommandResult => {
    const cursor = ctx.tool.cursor;

    ctx.canvas.unsetPixel(cursor[0], cursor[1]);

    return {
      successful: true,
    };
  };
}
