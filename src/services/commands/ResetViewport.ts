import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildResetViewportCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "reset-viewport",
    method: (): CommandResult => {
      ctx.viewport.setPan([0, 0]);
      ctx.viewport.setZoom(12);

      return {
        successful: true,
      };
    },
  };
}
