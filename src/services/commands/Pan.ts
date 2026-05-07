import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildPanCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "pan",
    method: (params: string[]): CommandResult => {
      let x = Number(params[0]);
      let y = Number(params[1]);
      const delta = params[2];

      const [offsetX, offsetY] = ctx.viewport.pan;

      if (delta === "delta") {
        x += offsetX;
        y += offsetY;
      }

      const [w, h] = ctx.canvas.size;

      if (x < -w / 2) {
        x = Math.ceil(-w / 2);
      }
      if (x > w / 2) {
        x = Math.floor(w / 2);
      }
      if (y < -h / 2) {
        y = Math.ceil(-h / 2);
      }
      if (y > h / 2) {
        y = Math.floor(h / 2);
      }

      ctx.viewport.setPan([x, y]);

      return {
        successful: true,
      };
    },
  };
}
