import type { CommandKeyBinding } from "./Command.type";
import { defaultKeyBindingsForEditMode } from "./key-bindings/EditMode";
import { defaultKeyBindingsForColorSelectMode } from "./key-bindings/ColorSelectMode";

export const defaultKeyBindings: CommandKeyBinding[] = [
  ...defaultKeyBindingsForEditMode,
  ...defaultKeyBindingsForColorSelectMode,
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
  {
    keys: ["t"],
    context: { infoStatus: "EDIT" },
    command: "change-info-status TOOL",
  },
  {
    keys: ["Escape"],
    context: { infoStatus: "TOOL" },
    command: "change-info-status EDIT",
  },
];
