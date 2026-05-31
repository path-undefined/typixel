import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildSelectLayerCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "select-layer",
    method: (params: string[]): CommandResult => {
      let layerIndex = Number(params[0]);
      const delta = params[1];

      if (delta === "delta") {
        layerIndex += ctx.canvas.currentLayerIndex;
      }

      if (layerIndex < 0) {
        layerIndex = 0;
      }
      if (layerIndex >= ctx.canvas.allLayers.length) {
        layerIndex = ctx.canvas.allLayers.length - 1;
      }

      ctx.canvas.selectLayer(layerIndex);

      ctx.tool.setInfoStatus("EDIT");

      return {
        successful: true,
      };
    },
  };
}
