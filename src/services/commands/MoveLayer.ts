import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildMoveLayerCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "move-layer",
    method: (params: string[]): CommandResult => {
      let to = Number(params[0]);
      const delta = params[1];

      if (delta === "delta") {
        to += ctx.canvas.currentLayerIndex;
      }

      if (to < 0) {
        to = 0;
      }
      if (to >= ctx.canvas.allLayers.length) {
        to = ctx.canvas.allLayers.length - 1;
      }

      ctx.canvas.moveLayerTo(to);
      ctx.canvas.selectLayer(to);

      return {
        successful: true,
      };
    },
  };
}
