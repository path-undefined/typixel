import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";
import { hexToU32 } from "../ConvertColor";

export function buildEraseAreaCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "erase-area",
    method: (): CommandResult => {
      const cursor = ctx.tool.cursor;

      const colorAtCursor = ctx.canvas.getPixel(cursor);
      const colorAtCursorU32 = hexToU32(colorAtCursor);

      if (colorAtCursorU32 === 0) {
        return {
          successful: true,
        };
      }

      const buffer = ctx.canvas.currentLayer!.buffer;
      const [w, h] = ctx.canvas.size;

      buffer[cursor[1] * w + cursor[0]] = 0;
      const stack: [number, number][] = [[cursor[0], cursor[1]]];

      while (stack.length > 0) {
        const [x, y] = stack.pop()!;

        if (x - 1 >= 0 && buffer[y * w + x - 1] === colorAtCursorU32) {
          buffer[y * w + x - 1] = 0;
          stack.push([x - 1, y]);
        }

        if (x + 1 < w && buffer[y * w + x + 1] === colorAtCursorU32) {
          buffer[y * w + x + 1] = 0;
          stack.push([x + 1, y]);
        }

        if (y - 1 >= 0 && buffer[(y - 1) * w + x] === colorAtCursorU32) {
          buffer[(y - 1) * w + x] = 0;
          stack.push([x, y - 1]);
        }

        if (y + 1 < h && buffer[(y + 1) * w + x] === colorAtCursorU32) {
          buffer[(y + 1) * w + x] = 0;
          stack.push([x, y + 1]);
        }
      }

      ctx.canvas.setDirty(true);

      return {
        successful: true,
      };
    },
  };
}
