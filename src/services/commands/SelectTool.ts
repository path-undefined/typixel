import type { Tool } from "@/stores/Tool";
import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildSelectToolCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "select-tool",
    method: (params: string[]): CommandResult => {
      const tool = params[0];

      if (!tool || !["PIXEL", "AREA", "LINE", "CIRCLE", "RECT"].includes(tool)) {
        return {
          successful: false,
          message: "Unknown tool",
        };
      }

      ctx.tool.setTool(tool as Tool);

      return {
        successful: true,
      };
    },
  };
}
