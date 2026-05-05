import type { CommandKeyBinding } from "./Command.type";

export const defaultKeyBindings: CommandKeyBinding[] = [
  {
    keys: ["ArrowUp"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor up",
  },
  {
    keys: ["ArrowDown"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor down",
  },
  {
    keys: ["ArrowLeft"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor left",
  },
  {
    keys: ["ArrowRight"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor right",
  },
  {
    keys: ["Control", "="],
    context: { infoStatus: "EDIT" },
    command: "zoom in",
  },
  {
    keys: ["Control", "-"],
    context: { infoStatus: "EDIT" },
    command: "zoom out",
  },
  {
    keys: [" "],
    context: { tool: "PIXEL", infoStatus: "EDIT" },
    command: "draw-pixel",
  },
  {
    keys: ["Backspace"],
    context: { tool: "PIXEL", infoStatus: "EDIT" },
    command: "erase-pixel",
  },
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
