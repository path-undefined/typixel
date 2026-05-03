import type { CommandContext, CommandMethod, CommandResult } from "./Command.type";

export function buildCreateCommand(ctx: CommandContext): CommandMethod {
  return (params: string[]): CommandResult => {
    const width = Number(params[0]);
    const height = Number(params[1]);

    if (!width || !height) {
      return {
        successful: false,
        message: "Invalid parameters",
      };
    }

    ctx.canvas.init(width, height);
    ctx.color.init();
    ctx.tool.init();
    ctx.viewport.init();

    return {
      successful: true,
    };
  };
}
