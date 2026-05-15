import { buildChangeInfoStatusCommand } from "./commands/ChangeInfoStatus";
import type { CommandContext, CommandMethod } from "./Command.type";
import { buildCreateCommand } from "./commands/Create";
import { buildDrawPixelCommand } from "./commands/DrawPixel";
import { buildErasePixelCommand } from "./commands/ErasePixel";
import { buildMoveCursorCommand } from "./commands/MoveCursor";
import { buildSelectColorCommand } from "./commands/SelectColor";
import { buildSelectPaletteCommand } from "./commands/SelectPalette";
import { buildSelectPaletteAndColorCommand } from "./commands/SelectPaletteAndColor";
import { buildZoomCommand } from "./commands/Zoom";
import { buildSelectToolCommand } from "./commands/SelectTool";
import { buildDrawAreaCommand } from "./commands/DrawArea";
import { buildEraseAreaCommand } from "./commands/EraseArea";
import { buildSaveCommand } from "./commands/Save";
import { buildLoadCommand } from "./commands/Load";
import { buildToggleGridCommand } from "./commands/ToggleGrid";
import { buildPanCommand } from "./commands/Pan";
import { buildRenameLayerCommand } from "./commands/RenameLayer";
import { buildCreateLayerCommand } from "./commands/CreateLayer";
import { buildSelectLayerCommand } from "./commands/SelectLayer";
import { buildToggleLayerVisibilityCommand } from "./commands/ToggleLayerVisibility";
import { buildMoveLayerCommand } from "./commands/MoveLayer";
import { buildRemoveLayerCommand } from "./commands/RemoveLayer";
import { buildMergeDownLayerCommand } from "./commands/MergeDownLayer";

export function buildCommandMethodLookup(
  ctx: CommandContext,
): Record<string, CommandMethod> {
  const lookup: Record<string, CommandMethod> = {};

  const commandDefinitions = [
    buildChangeInfoStatusCommand(ctx),
    buildCreateCommand(ctx),
    buildDrawPixelCommand(ctx),
    buildErasePixelCommand(ctx),
    buildDrawAreaCommand(ctx),
    buildEraseAreaCommand(ctx),
    buildMoveCursorCommand(ctx),
    buildCreateLayerCommand(ctx),
    buildRenameLayerCommand(ctx),
    buildToggleLayerVisibilityCommand(ctx),
    buildMoveLayerCommand(ctx),
    buildMergeDownLayerCommand(ctx),
    buildRemoveLayerCommand(ctx),
    buildSelectLayerCommand(ctx),
    buildSaveCommand(ctx),
    buildLoadCommand(ctx),
    buildSelectPaletteAndColorCommand(ctx),
    buildSelectPaletteCommand(ctx),
    buildSelectColorCommand(ctx),
    buildSelectToolCommand(ctx),
    buildToggleGridCommand(ctx),
    buildPanCommand(ctx),
    buildZoomCommand(ctx),
  ];

  commandDefinitions.forEach((d) => {
    lookup[d.command] = d.method;
  });

  return lookup;
}
