import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildMergeDownLayerCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "merge-down-layer",
    method: (): CommandResult => {
      if (ctx.canvas.currentLayerIndex === 0) {
        return {
          successful: false,
          message: "No layer to merge",
        };
      }

      const targetLayerIndex = ctx.canvas.currentLayerIndex - 1;
      const targetBuffer = ctx.canvas.allLayers[targetLayerIndex]!.buffer;
      const currentBuffer = ctx.canvas.currentLayer!.buffer;

      const [w, h] = ctx.canvas.size;

      for (let i = 0; i < w * h; i++) {
        const pixelColor = currentBuffer[i]!;

        if (pixelColor !== 0) {
          targetBuffer[i] = pixelColor;
        }
      }

      ctx.canvas.removeLayer();
      ctx.canvas.selectLayer(targetLayerIndex);

      return {
        successful: true,
      };
    },
  };
}
