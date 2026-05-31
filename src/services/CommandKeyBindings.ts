import type { CommandKeyBinding } from "./Command.type";
import { defaultKeyBindingsForEditMode } from "./key-bindings/EditMode";
import { defaultKeyBindingsForColorSelectMode } from "./key-bindings/ColorSelectMode";
import { defaultKeyBindingsForPaletteSelectMode } from "./key-bindings/PaletteSelectMode";
import { defaultKeyBindingsForToolSelectMode } from "./key-bindings/ToolSelectMode";
import { defaultKeyBindingsForLayerSelectMode } from "./key-bindings/LayerSelectMode";

export const defaultKeyBindings: CommandKeyBinding[] = [
  ...defaultKeyBindingsForEditMode,
  ...defaultKeyBindingsForColorSelectMode,
  ...defaultKeyBindingsForPaletteSelectMode,
  ...defaultKeyBindingsForToolSelectMode,
  ...defaultKeyBindingsForLayerSelectMode,
];
