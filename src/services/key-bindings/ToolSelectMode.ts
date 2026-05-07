import type { CommandKeyBinding } from "../Command.type";

export const defaultKeyBindingsForToolSelectMode: CommandKeyBinding[] = [
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
  {
    keys: ["1"],
    context: { infoStatus: "TOOL" },
    command: "select-tool PIXEL",
  },
  {
    keys: ["2"],
    context: { infoStatus: "TOOL" },
    command: "select-tool AREA",
  },
  {
    keys: ["3"],
    context: { infoStatus: "TOOL" },
    command: "select-tool LINE",
  },
  {
    keys: ["4"],
    context: { infoStatus: "TOOL" },
    command: "select-tool CIRCLE",
  },
  {
    keys: ["5"],
    context: { infoStatus: "TOOL" },
    command: "select-tool RECT",
  },
];
