import type { CommandContext, CommandDefinition, CommandResult } from "../Command.type";

export function buildLoadPalettesCommand(
  ctx: CommandContext,
): CommandDefinition {
  return {
    command: "load-palettes",
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
          const palettesJson = (event.target as FileReader).result as string;
          const palettes = JSON.parse(palettesJson) as string[][];

          ctx.color.state.allPalettes = palettes;
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
