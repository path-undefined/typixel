import type { CommandKeyBinding } from "./Command.type";
import { defaultKeyBindingsForEditMode } from "./key-bindings/EditMode";
import { defaultKeyBindingsForColorSelectMode } from "./key-bindings/ColorSelectMode";
import { defaultKeyBindingsForToolSelectMode } from "./key-bindings/ToolSelectMode";
import { defaultKeyBindingsForLayerSelectMode } from "./key-bindings/LayerSelectMode";

export const defaultKeyBindings: CommandKeyBinding[] = [
  ...defaultKeyBindingsForEditMode,
  ...defaultKeyBindingsForColorSelectMode,
  ...defaultKeyBindingsForToolSelectMode,
  ...defaultKeyBindingsForLayerSelectMode,
  {
    keys: ["p"],
    context: { infoStatus: "EDIT" },
    command: "change-info-status PALETTE",
  },
  {
    keys: ["Escape"],
    context: { infoStatus: "PALETTE" },
    command: "change-info-status EDIT",
  },
];
