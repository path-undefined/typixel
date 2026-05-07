import type { CommandKeyBinding } from "../Command.type";

export const defaultKeyBindingsForEditMode: CommandKeyBinding[] = [
  {
    keys: ["ArrowUp"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor 0 -1 delta",
  },
  {
    keys: ["ArrowDown"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor 0 1 delta",
  },
  {
    keys: ["ArrowLeft"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor -1 0 delta",
  },
  {
    keys: ["ArrowRight"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor 1 0 delta",
  },
  {
    keys: ["Control", "ArrowUp"],
    context: { infoStatus: "EDIT" },
    command: "pan 0 -1 delta",
  },
  {
    keys: ["Control", "ArrowDown"],
    context: { infoStatus: "EDIT" },
    command: "pan 0 1 delta",
  },
  {
    keys: ["Control", "ArrowLeft"],
    context: { infoStatus: "EDIT" },
    command: "pan -1 0 delta",
  },
  {
    keys: ["Control", "ArrowRight"],
    context: { infoStatus: "EDIT" },
    command: "pan 1 0 delta",
  },
  {
    keys: ["Control", "="],
    context: { infoStatus: "EDIT" },
    command: "zoom 2 delta",
  },
  {
    keys: ["Control", "-"],
    context: { infoStatus: "EDIT" },
    command: "zoom -2 delta",
  },
  {
    keys: ["Control", "`"],
    context: { infoStatus: "EDIT" },
    command: "pan 0 0; zoom 12",
  },
  {
    keys: ["g"],
    context: { infoStatus: "EDIT" },
    command: "toggle-grid",
  },
  {
    keys: [" "],
    context: { tool: "PIXEL", infoStatus: "EDIT" },
    command: "draw-pixel",
  },
  {
    keys: ["x"],
    context: { tool: "PIXEL", infoStatus: "EDIT" },
    command: "erase-pixel",
  },
  {
    keys: [" "],
    context: { tool: "AREA", infoStatus: "EDIT" },
    command: "draw-area",
  },
  {
    keys: ["x"],
    context: { tool: "AREA", infoStatus: "EDIT" },
    command: "erase-area",
  },
];
