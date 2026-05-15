import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildRemoveLayerCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "remove-layer",
    method: (): CommandResult => {
      if (ctx.canvas.allLayers.length === 1) {
        return {
          successful: false,
          message: "Cannot remove last layer",
        };
      }

      ctx.canvas.removeLayer();

      return {
        successful: true,
      };
    },
  };
}
