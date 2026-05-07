import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildEraseAreaCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "erase-area",
    method: (): CommandResult => {
      const cursor = ctx.tool.cursor;

      const colorIndexAtCursor
        = ctx.canvas.currentLayer!.buffer[cursor[0]]![cursor[1]]!;

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

        const colorIndex = ctx.canvas.currentLayer!.buffer[x]![y]!;

        if (colorIndex === colorIndexAtCursor) {
          area.push([x, y]);

          visited[x * ctx.canvas.size[1] + y] = 1;

          stack.push([x - 1, y]);
          stack.push([x + 1, y]);
          stack.push([x, y - 1]);
          stack.push([x, y + 1]);
        }
      }

      area.forEach(([x, y]) => {
        ctx.canvas.unsetPixel(x, y);
      });

      return {
        successful: true,
      };
    },
  };
}
