import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";
import type { InfoStatus } from "@/stores/Tool";

export function buildChangeInfoStatusCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "change-info-status",
    method: (params: string[]): CommandResult => {
      const status = params[0];

      if (!status || !["EDIT", "TOOL", "PALETTE", "COLOR", "LAYER"].includes(status)) {
        return {
          successful: false,
          message: "Unknown status",
        };
      }

      ctx.tool.setInfoStatus(status as InfoStatus);

      return {
        successful: true,
      };
    },
  };
}
