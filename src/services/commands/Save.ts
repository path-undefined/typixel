import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";
import type { CanvasState, Layer } from "@/stores/Canvas";
import type { ColorState } from "@/stores/Color";
import type { ToolState } from "@/stores/Tool";
import type { ViewportState } from "@/stores/Viewport";

export type ProjectState = {
  canvas: {
    allLayers: Array<{
      buffer: number[]
    } & Omit<Layer, "buffer">>
  } & Omit<CanvasState, "allLayers" | "dirty">
  color: ColorState
  tool: ToolState
  viewport: Omit<ViewportState, "resolution">
};

export function buildSaveCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "save",
    method: (params: string []): CommandResult => {
      const filename = params[0];

      if (!filename) {
        return {
          successful: false,
          message: "Filename is missing",
        };
      }

      const canvas = {
        ...ctx.canvas.state,
        allLayers: ctx.canvas.state.allLayers.map((l) => ({
          ...l,
          buffer: Array.from(l.buffer),
        })),
        dirty: undefined,
      };

      const color = ctx.color.state;
      const tool = ctx.tool.state;
      const viewport = {
        ...ctx.viewport.state,
        resolution: undefined,
      };

      const projectState = {
        canvas,
        color,
        tool,
        viewport,
      } satisfies ProjectState;

      const projectStateJson = JSON.stringify(projectState);

      const blob = new Blob([projectStateJson], { type: "application/jsno" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.json`;
      link.click();

      URL.revokeObjectURL(url);

      return {
        successful: true,
      };
    },
  };
}
