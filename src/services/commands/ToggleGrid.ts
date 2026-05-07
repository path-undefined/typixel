import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildToggleGridCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "toggle-grid",
    method: (): CommandResult => {
      ctx.tool.setShowGrid(!ctx.tool.showGrid);

      return {
        successful: true,
      };
    },
  };
}
