import type { CommandKeyBinding } from "../Command.type";

export const defaultKeyBindingsForLayerSelectMode: CommandKeyBinding[] = [
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
    keys: ["v"],
    context: { infoStatus: "LAYER" },
    command: "toggle-layer-visibility",
  },
  {
    keys: ["ArrowUp"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 1 delta",
  },
  {
    keys: ["ArrowDown"],
    context: { infoStatus: "LAYER" },
    command: "select-layer -1 delta",
  },
  {
    keys: ["1"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 0",
  },
  {
    keys: ["2"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 1",
  },
  {
    keys: ["3"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 2",
  },
  {
    keys: ["4"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 3",
  },
  {
    keys: ["5"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 4",
  },
  {
    keys: ["6"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 5",
  },
  {
    keys: ["7"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 6",
  },
  {
    keys: ["8"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 7",
  },
  {
    keys: ["9"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 8",
  },
  {
    keys: ["0"],
    context: { infoStatus: "LAYER" },
    command: "select-layer 9",
  },
];
