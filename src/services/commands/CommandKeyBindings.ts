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
];
