import { defineStore } from "pinia";
import { computed, ref } from "vue";

type Tool = "PIXEL" | "FILL" | "CIRCLE" | "RECT" | "LINE";
type ToolStatus = "IDLE" | "STARTED";
type InfoStatus = "EDIT" | "TOOL" | "PALETTE" | "COLOR" | "LAYER";

type EditorStateState = {
  resolution: [number, number]
  size: [number, number]
  pan: [number, number]
  zoom: number
  tool: Tool
  toolStatus: ToolStatus
  infoStatus: InfoStatus
  keyBindings: KeyBinding[]
};

type KeyBinding = {
  keys: string[]
  command: string
  context?: Context
};

type Context = {
  tool?: Tool
  toolStatus?: ToolStatus
  infoStatus?: InfoStatus
};

export const useEditorState = defineStore("editor-state", () => {
  const state = ref<EditorStateState>({
    resolution: [0, 0],
    size: [0, 0],
    pan: [0, 0],
    zoom: 0,
    tool: "PIXEL",
    toolStatus: "IDLE",
    infoStatus: "EDIT",
    keyBindings: [],
  });

  const resolution = computed(() => state.value.resolution);
  const size = computed(() => state.value.size);
  const pan = computed(() => state.value.pan);
  const zoom = computed(() => state.value.zoom);
  const currentTool = computed(() => state.value.tool);
  const currentToolStatus = computed(() => state.value.toolStatus);
  const currentInfoStatus = computed(() => state.value.infoStatus);

  function setResolution(resolution: [number, number]) {
    state.value.resolution = resolution;
  }

  function setSize(size: [number, number]) {
    state.value.size = size;
  }

  function setPan(pan: [number, number]) {
    state.value.pan = pan;
  }

  function setZoom(zoom: number) {
    state.value.zoom = zoom;
  }

  function setTool(tool: Tool) {
    state.value.tool = tool;
  }

  function setToolStatus(toolStatus: ToolStatus) {
    state.value.toolStatus = toolStatus;
  }

  function setInfoStatus(infoStatus: InfoStatus) {
    state.value.infoStatus = infoStatus;
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

  function contextsAreMatching(current: Context, target: Context) {
    return (!target.tool || target.tool === current.tool)
      && (!target.toolStatus || target.toolStatus === current.toolStatus)
      && (!target.infoStatus || target.infoStatus === current.infoStatus);
  }

  function getCommand(keys: string[]): string | null {
    return state.value.keyBindings
      .filter((b) => keysAreEqual(keys, b.keys))
      .find((b) => !b.context || contextsAreMatching(state.value, b.context))
      ?.command ?? null;
  }

  function setKeyBinding(binding: KeyBinding) {
    const existingBinding = state.value.keyBindings
      .filter((b) => keysAreEqual(binding.keys, b.keys))
      .find((b) => !b.context || contextsAreMatching(state.value, b.context))
      ?? null;

    if (existingBinding) {
      existingBinding.command = binding.command;
      return;
    }

    state.value.keyBindings.push(binding);
  }

  function unsetKeyBinding(binding: Omit<KeyBinding, "command">) {
    const index = state.value.keyBindings
      .findIndex((b) =>
        keysAreEqual(binding.keys, b.keys) &&
        (!b.context || contextsAreMatching(state.value, b.context))
      );

    if (index > 0) {
      state.value.keyBindings.splice(index, 1);
    }
  }

  return {
    state,
    resolution,
    size,
    pan,
    zoom,
    currentTool,
    currentToolStatus,
    currentInfoStatus,
    setResolution,
    setSize,
    setPan,
    setZoom,
    setCurrentTool: setTool,
    setCurrentToolStatus: setToolStatus,
    setCurrentInfoStatus: setInfoStatus,
    getCommand,
    setKeyBinding,
    unsetKeyBinding,
  };
});
