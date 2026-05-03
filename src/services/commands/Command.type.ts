import type { useCanvas } from "@/stores/Canvas";
import type { useColor } from "@/stores/Color";
import type { InfoStatus, Tool, ToolStatus, useTool } from "@/stores/Tool";
import type { useViewport } from "@/stores/Viewport";

export type CommandContext = {
  canvas: ReturnType<typeof useCanvas>
  color: ReturnType<typeof useColor>
  tool: ReturnType<typeof useTool>
  viewport: ReturnType<typeof useViewport>
};

export type CommandResult = {
  successful: boolean
  message?: string
};

export type CommandMethod = (params: string[]) => CommandResult;

export type CommandKeyBinding = {
  keys: string[]
  command: string
  context?: CommandKeyBindingContext
};

export type CommandKeyBindingContext = {
  tool?: Tool
  toolStatus?: ToolStatus
  infoStatus?: InfoStatus
};
