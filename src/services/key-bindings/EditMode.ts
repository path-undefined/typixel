import type { CommandKeyBinding } from "../Command.type";

export const defaultKeyBindingsForEditMode: CommandKeyBinding[] = [
  {
    keys: ["ArrowUp"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor 0 -1",
  },
  {
    keys: ["ArrowDown"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor 0 1",
  },
  {
    keys: ["ArrowLeft"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor -1 0",
  },
  {
    keys: ["ArrowRight"],
    context: { infoStatus: "EDIT" },
    command: "move-cursor 1 0",
  },
  {
    keys: ["Control", "ArrowUp"],
    context: { infoStatus: "EDIT" },
    command: "pan 0 -1",
  },
  {
    keys: ["Control", "ArrowDown"],
    context: { infoStatus: "EDIT" },
    command: "pan 0 1",
  },
  {
    keys: ["Control", "ArrowLeft"],
    context: { infoStatus: "EDIT" },
    command: "pan -1 0",
  },
  {
    keys: ["Control", "ArrowRight"],
    context: { infoStatus: "EDIT" },
    command: "pan 1 0",
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
    keys: ["Control", "`"],
    context: { infoStatus: "EDIT" },
    command: "reset-viewport",
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
