<template>
  <div class="cmd-input">
    <label class="cmd-input__input-container">
      <span class="cmd-input__label">
        Command Input
      </span>
      <input
        v-model="command"
        class="cmd-input__input"
        tabindex="0"
        @keydown.enter="submitCommand"
      >
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCommand } from "@/stores/Command";

const { dispatchCommand } = useCommand();

const command = ref<string>("");

function submitCommand() {
  dispatchCommand(command.value);
  command.value = "";
}
</script>

<style lang="scss" scoped>
.cmd-input {
  border-radius: t.$border-radius;
  padding: 8px;
  width: 100%;
  height: 100%;
  background-color: t.$color-g1-2;

  &__input-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__label {
    font-weight: bold;
  }

  &__input {
    border-radius: t.$border-radius;
    border: 2px solid transparent;
    padding: 4px;
    width: 100%;
    outline: none;
    font-size: 12px;
    color: t.$color-g2-0;
    background-color: t.$color-g1-4;
    transition: background-color 0.2s;

    &:hover, &:focus {
      background-color: t.$color-g1-5;
    }

    &:focus {
      border-color: t.$color-p-3;
    }
  }
}
</style>
