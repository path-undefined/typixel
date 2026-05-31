import type { CommandKeyBinding } from "../Command.type";

export const defaultKeyBindingsForPaletteSelectMode: CommandKeyBinding[] = [
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
    keys: ["ArrowUp"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette -1 delta",
  },
  {
    keys: ["ArrowDown"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 1 delta",
  },
  {
    keys: ["1"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 0",
  },
  {
    keys: ["2"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 1",
  },
  {
    keys: ["3"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 2",
  },
  {
    keys: ["4"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 3",
  },
  {
    keys: ["5"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 4",
  },
  {
    keys: ["6"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 5",
  },
  {
    keys: ["7"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 6",
  },
  {
    keys: ["8"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 7",
  },
  {
    keys: ["9"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 8",
  },
  {
    keys: ["0"],
    context: { infoStatus: "PALETTE" },
    command: "select-palette 9",
  },
];
