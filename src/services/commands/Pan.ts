import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildPanCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "pan",
    method: (params: string[]): CommandResult => {
      const deltaX = Number(params[0]);
      const deltaY = Number(params[1]);

      const [offsetX, offsetY] = ctx.viewport.pan;
      let x = offsetX + deltaX;
      let y = offsetY + deltaY;

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

      console.log([x, y]);

      ctx.viewport.setPan([x, y]);

      return {
        successful: true,
      };
    },
  };
}
