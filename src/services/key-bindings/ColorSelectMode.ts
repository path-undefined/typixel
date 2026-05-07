import type { CommandKeyBinding } from "../Command.type";

export const defaultKeyBindingsForColorSelectMode: CommandKeyBinding[] = [
  {
    keys: ["c"],
    context: { infoStatus: "EDIT" },
    command: "change-info-status COLOR",
  },
  {
    keys: ["Escape"],
    context: { infoStatus: "COLOR" },
    command: "change-info-status EDIT",
  },
  {
    keys: ["ArrowUp"],
    context: { infoStatus: "COLOR" },
    command: "select-color -1 delta",
  },
  {
    keys: ["ArrowDown"],
    context: { infoStatus: "COLOR" },
    command: "select-color 1 delta",
  },
  {
    keys: ["1"],
    context: { infoStatus: "COLOR" },
    command: "select-color 0",
  },
  {
    keys: ["2"],
    context: { infoStatus: "COLOR" },
    command: "select-color 1",
  },
  {
    keys: ["3"],
    context: { infoStatus: "COLOR" },
    command: "select-color 2",
  },
  {
    keys: ["4"],
    context: { infoStatus: "COLOR" },
    command: "select-color 3",
  },
  {
    keys: ["5"],
    context: { infoStatus: "COLOR" },
    command: "select-color 4",
  },
  {
    keys: ["6"],
    context: { infoStatus: "COLOR" },
    command: "select-color 5",
  },
  {
    keys: ["7"],
    context: { infoStatus: "COLOR" },
    command: "select-color 6",
  },
  {
    keys: ["8"],
    context: { infoStatus: "COLOR" },
    command: "select-color 7",
  },
  {
    keys: ["9"],
    context: { infoStatus: "COLOR" },
    command: "select-color 8",
  },
  {
    keys: ["0"],
    context: { infoStatus: "COLOR" },
    command: "select-color 9",
  },
];
