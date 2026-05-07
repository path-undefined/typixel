import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildRenameLayerCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "rename-layer",
    method: (params: string[]): CommandResult => {
      const newName = params[0];

      if (!newName) {
        return {
          successful: false,
          message: "Invalid layer name",
        };
      }

      ctx.canvas.renameLayer(newName);

      return {
        successful: true,
      };
    },
  };
}
