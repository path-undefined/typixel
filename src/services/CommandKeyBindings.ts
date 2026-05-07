import type { CommandKeyBinding } from "./Command.type";
import { defaultKeyBindingsForEditMode } from "./key-bindings/EditMode";
import { defaultKeyBindingsForColorSelectMode } from "./key-bindings/ColorSelectMode";
import { defaultKeyBindingsForToolSelectMode } from "./key-bindings/ToolSelectMode";

export const defaultKeyBindings: CommandKeyBinding[] = [
  ...defaultKeyBindingsForEditMode,
  ...defaultKeyBindingsForColorSelectMode,
  ...defaultKeyBindingsForToolSelectMode,
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
  {
    keys: ["l"],
    context: { infoStatus: "EDIT" },
    command: "change-info-status LAYER",
  },
  {
    keys: ["Escape"],
    context: { infoStatus: "LAYER" },
    command: "change-info-status EDIT",
  },
];
