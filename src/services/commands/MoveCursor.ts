import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildMoveCursorCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "move-cursor",
    method: (params: string[]): CommandResult => {
      let x = Number(params[0]);
      let y = Number(params[1]);
      const delta = params[2];

      const [currX, currY] = ctx.tool.cursor;

      if (delta === "delta") {
        x += currX;
        y += currY;
      }

      const [w, h] = ctx.canvas.size;

      if (x < 0) {
        x = 0;
      }
      if (x >= w) {
        x = w - 1;
      }
      if (y < 0) {
        y = 0;
      }
      if (y >= h) {
        y = h - 1;
      }

      ctx.tool.setCursor([x, y]);

      return {
        successful: true,
      };
    },
  };
}
