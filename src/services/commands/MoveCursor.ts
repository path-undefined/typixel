import type { CommandContext, CommandMethod, CommandResult } from "./Command.type";

export function buildMoveCursorCommand(ctx: CommandContext): CommandMethod {
  return (params: string[]): CommandResult => {
    const direction = params[0];

    const current = ctx.tool.cursor;

    switch (direction) {
      case "up":
        ctx.tool.setCursor(
          [current[0], Math.max(0, current[1] - 1)],
        );
        break;
      case "down":
        ctx.tool.setCursor(
          [current[0], Math.min(ctx.canvas.size[1] - 1, current[1] + 1)],
        );
        break;
      case "left":
        ctx.tool.setCursor(
          [Math.max(0, current[0] - 1), current[1]],
        );
        break;
      case "right":
        ctx.tool.setCursor(
          [Math.min(ctx.canvas.size[0] - 1, current[0] + 1), current[1]],
        );
        break;
      default:
        return {
          successful: false,
          message: "Unknown moving direction",
        };
    }

    return {
      successful: true,
    };
  };
}
