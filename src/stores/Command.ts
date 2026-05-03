import { defineStore } from "pinia";
import { ref } from "vue";
import { defaultKeyBindings } from "@/services/commands/CommandKeyBindings";
import type {
  CommandContext,
  CommandKeyBinding,
  CommandKeyBindingContext,
  CommandResult,
} from "@/services/commands/Command.type";
import { useTool } from "./Tool";
import { useCanvas } from "./Canvas";
import { useColor } from "./Color";
import { useViewport } from "./Viewport";
import { buildCommandMethodLookup } from "@/services/commands/CommandLookup";

type CommandState = {
  keyBindings: CommandKeyBinding[]
};

export const useCommand = defineStore("command", () => {
  const canvas = useCanvas();
  const color = useColor();
  const tool = useTool();
  const viewport = useViewport();

  const ctx: CommandContext = {
    canvas,
    color,
    tool,
    viewport,
  };

  const state = ref<CommandState>({
    keyBindings: defaultKeyBindings,
  });

  const commandMethodLookup = buildCommandMethodLookup(ctx);

  function dispatchCommand(command: string): CommandResult {
    const [verb, ...params] = command.split(" ");

    const commandMethod = commandMethodLookup[
      verb as keyof typeof commandMethodLookup
    ];

    if (!commandMethod) {
      return {
        successful: false,
        message: "Command not found",
      };
    }

    return commandMethod(params);
  }

  function getCommand(keys: string[]): string | null {
    return state.value.keyBindings
      .filter((b) => keysAreEqual(keys, b.keys))
      .find((b) => !b.context || contextsAreMatching(tool.state, b.context))
      ?.command ?? null;
  }

  function setKeyBinding(binding: CommandKeyBinding) {
    const existingBinding = state.value.keyBindings
      .filter((b) => keysAreEqual(binding.keys, b.keys))
      .find((b) => !b.context || contextsAreMatching(tool.state, b.context))
      ?? null;

    if (existingBinding) {
      existingBinding.command = binding.command;
      return;
    }

    state.value.keyBindings.push(binding);
  }

  function unsetKeyBinding(binding: Omit<CommandKeyBinding, "command">) {
    const index = state.value.keyBindings
      .findIndex((b) =>
        keysAreEqual(binding.keys, b.keys)
        && (!b.context || contextsAreMatching(tool.state, b.context)),
      );

    if (index > 0) {
      state.value.keyBindings.splice(index, 1);
    }
  }

  function keysAreEqual(keys1: string[], keys2: string[]): boolean {
    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }
    }

    for (const key of keys2) {
      if (!keys1.includes(key)) {
        return false;
      }
    }

    return true;
  }

  function contextsAreMatching(
    current: CommandKeyBindingContext,
    target: CommandKeyBindingContext,
  ) {
    return (!target.tool || target.tool === current.tool)
      && (!target.toolStatus || target.toolStatus === current.toolStatus)
      && (!target.infoStatus || target.infoStatus === current.infoStatus);
  }

  return {
    dispatchCommand,
    getCommand,
    setKeyBinding,
    unsetKeyBinding,
  };
});
