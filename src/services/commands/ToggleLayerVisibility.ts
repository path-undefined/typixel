import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildToggleLayerVisibilityCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "toggle-layer-visibility",
    method: (): CommandResult => {
      ctx.canvas.toggleLayerVisibility();

      return {
        successful: true,
      };
    },
  };
}
