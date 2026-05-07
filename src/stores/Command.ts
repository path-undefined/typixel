import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { defaultKeyBindings } from "@/services/CommandKeyBindings";
import type {
  CommandContext,
  CommandKeyBinding,
  CommandKeyBindingContext,
  CommandResult,
} from "@/services/Command.type";
import { useTool } from "./Tool";
import { useCanvas } from "./Canvas";
import { useColor } from "./Color";
import { useViewport } from "./Viewport";
import { buildCommandMethodLookup } from "@/services/CommandLookup";

export type CommandState = {
  lastCommandResult: CommandResult | null
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

  const commandMethodLookup = buildCommandMethodLookup(ctx);

  const state = ref<CommandState>({
    lastCommandResult: null,
    keyBindings: defaultKeyBindings,
  });

  const lastCommandResult = computed(() => state.value.lastCommandResult);

  function executeCommand(command: string) {
    state.value.lastCommandResult = executeCommandInternally(command);

    setTimeout(() => {
      state.value.lastCommandResult = null;
    }, 10 * 1000);
  }

  function executeCommandByKeyBinding(keys: string[]): boolean {
    const command = state.value.keyBindings
      .filter((b) => keysAreEqual(keys, b.keys))
      .find((b) => !b.context || contextsAreMatching(tool.state, b.context))
      ?.command ?? null;

    if (!command) {
      return false;
    }

    executeCommandInternally(command);

    return true;
  }

  function executeCommandInternally(command: string): CommandResult {
    const units = command.split(";");

    for (const unit of units) {
      const regex = /[^\s"]+|"([^"]*)"/gi;
      const parts = [];

      const it = unit.matchAll(regex);

      let match;

      while ((match = it.next().value)) {
        parts.push(match[1] || match[0]);
      }

      const [verb, ...params] = parts;

      const commandMethod = commandMethodLookup[
        verb as keyof typeof commandMethodLookup
      ];

      if (!commandMethod) {
        return {
          successful: false,
          message: "Command not found",
        };
      }

      const result = commandMethod(params);

      if (!result.successful) {
        return result;
      }
    }

    return {
      successful: true,
    };
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
    state,
    lastCommandResult,
    executeCommand,
    executeCommandByKeyBinding,
    setKeyBinding,
    unsetKeyBinding,
  };
});
