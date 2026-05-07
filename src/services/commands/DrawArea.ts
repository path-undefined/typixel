import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildDrawAreaCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "draw-area",
    method: (): CommandResult => {
      const cursor = ctx.tool.cursor;
      const color = ctx.color.currentColorInUse;

      const colorAtCursor = ctx.canvas.getPixel(cursor);

      const area: [number, number][] = [];
      const visited = new Uint8Array(ctx.canvas.size[0] * ctx.canvas.size[1]);
      const stack: [number, number][] = [[cursor[0], cursor[1]]];

      while (stack.length > 0) {
        const [x, y] = stack.pop()!;

        if (visited[x * ctx.canvas.size[1] + y]) {
          continue;
        }

        if (
          x < 0 || x >= ctx.canvas.size[0]
          || y < 0 || y >= ctx.canvas.size[1]
        ) {
          continue;
        }

        const colorAtPixel = ctx.canvas.getPixel([x, y]);

        if (colorAtPixel === colorAtCursor) {
          area.push([x, y]);

          visited[x * ctx.canvas.size[1] + y] = 1;

          stack.push([x - 1, y]);
          stack.push([x + 1, y]);
          stack.push([x, y - 1]);
          stack.push([x, y + 1]);
        }
      }

      area.forEach(([x, y]) => {
        ctx.canvas.setPixel([x, y], color);
      });

      return {
        successful: true,
      };
    },
  };
}
