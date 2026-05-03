import type { CommandContext, CommandMethod, CommandResult } from "./Command.type";

export function buildZoomCommand(ctx: CommandContext): CommandMethod {
  return (params: string[]): CommandResult => {
    const direction = params[0];

    const current = ctx.viewport.zoom;

    switch (direction) {
      case "in":
        ctx.viewport.setZoom(
          Math.min(30, current + 1),
        );
        break;
      case "out":
        ctx.viewport.setZoom(
          Math.max(4, current - 1),
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
