import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildNewLayerCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "new-layer",
    method: (params: string[]): CommandResult => {
      const name = params[0] || "Untitled Layer";

      ctx.canvas.insertLayer(name);

      return {
        successful: true,
      };
    },
  };
}
