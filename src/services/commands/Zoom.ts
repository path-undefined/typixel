import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildZoomCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "zoom",
    method: (params: string[]): CommandResult => {
      let zoom = Number(params[0]);
      const delta = params[1];

      const currentZoom = ctx.viewport.zoom;

      if (delta === "delta") {
        zoom += currentZoom;
      }

      if (zoom < 4) {
        zoom = 4;
      }
      if (zoom > 30) {
        zoom = 30;
      }

      ctx.viewport.setZoom(zoom);

      return {
        successful: true,
      };
    },
  };
}
