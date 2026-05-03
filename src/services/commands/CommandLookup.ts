import type { CommandContext, CommandMethod } from "./Command.type";
import { buildCreateCommand } from "./Create";
import { buildDrawPixelCommand } from "./DrawPixel";
import { buildErasePixelCommand } from "./ErasePixel";
import { buildMoveCursorCommand } from "./MoveCursor";
import { buildZoomCommand } from "./Zoom";

export function buildCommandMethodLookup(
  ctx: CommandContext,
): Record<string, CommandMethod> {
  return {
    "create": buildCreateCommand(ctx),
    "draw-pixel": buildDrawPixelCommand(ctx),
    "erase-pixel": buildErasePixelCommand(ctx),
    "move-cursor": buildMoveCursorCommand(ctx),
    "zoom": buildZoomCommand(ctx),
  };
}
