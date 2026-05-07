import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";
import type { ProjectState } from "./Save";

export function buildLoadCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "load",
    method: (): CommandResult => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";

      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];

        if (!file) {
          return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
          const projectStateJson
            = (event.target as FileReader).result as string;
          const projectState = JSON.parse(projectStateJson) as ProjectState;

          ctx.canvas.state.allLayers
            = projectState.canvas.allLayers
              .map((l) => ({ ...l, buffer: new Uint32Array(l.buffer) }));
          ctx.canvas.state.currentLayerIndex
            = projectState.canvas.currentLayerIndex;
          ctx.canvas.state.size = projectState.canvas.size;
          ctx.canvas.state.dirty = true;

          ctx.color.state.allPalettes = projectState.color.allPalettes;
          ctx.color.state.currentColor = projectState.color.currentColor;
          ctx.color.state.selectedColorIndex
            = projectState.color.selectedColorIndex;
          ctx.color.state.selectedPaletteIndex
            = projectState.color.selectedPaletteIndex;

          ctx.tool.state.cursor = projectState.tool.cursor;
          ctx.tool.state.infoStatus = projectState.tool.infoStatus;
          ctx.tool.state.tool = projectState.tool.tool;
          ctx.tool.state.toolStatus = projectState.tool.toolStatus;

          ctx.viewport.state.pan = projectState.viewport.pan;
          ctx.viewport.state.zoom = projectState.viewport.zoom;
        };

        reader.readAsText(file);
      };

      input.click();

      return {
        successful: true,
      };
    },
  };
}
