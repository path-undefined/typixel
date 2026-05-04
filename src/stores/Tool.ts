import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type Tool = "PIXEL" | "FILL" | "CIRCLE" | "RECT" | "LINE";
export type ToolStatus = "READY" | "STARTED";
export type InfoStatus = "EDIT" | "TOOL" | "PALETTE" | "COLOR" | "LAYER";

type ToolState = {
  cursor: [number, number]
  tool: Tool
  toolStatus: ToolStatus
  infoStatus: InfoStatus
};

export const useTool = defineStore("tool", () => {
  const state = ref<ToolState>({
    cursor: [0, 0],
    tool: "PIXEL",
    toolStatus: "READY",
    infoStatus: "EDIT",
  });

  const cursor = computed(() => state.value.cursor);
  const tool = computed(() => state.value.tool);
  const toolStatus = computed(() => state.value.toolStatus);
  const infoStatus = computed(() => state.value.infoStatus);

  function init() {
    state.value.cursor = [0, 0];
    state.value.tool = "PIXEL";
    state.value.toolStatus = "READY";
    state.value.infoStatus = "EDIT";
  }

  function setCursor(cursor: [number, number]) {
    state.value.cursor = cursor;
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

  return {
    state,
    cursor,
    tool,
    toolStatus,
    infoStatus,
    init,
    setCursor,
    setTool,
    setToolStatus,
    setInfoStatus,
  };
});
