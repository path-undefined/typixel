<template>
  <div class="command-input">
    <label
      for="command-input"
      class="command-input__label"
    >
      Command Input
    </label>

    <div
      v-if="command.lastCommandResult"
      class="command-input__status"
      :class="{
        'command-input__status--success':
          command.lastCommandResult.successful,
        'command-input__status--error':
          !command.lastCommandResult.successful,
      }"
    >
      <span class="command-input__status-text">
        {{ command.lastCommandResult.successful ? "SUCCESSFUL" : "ERROR" }}
      </span>

      {{ command.lastCommandResult.message }}
    </div>

    <input
      id="command-input"
      v-model="commandInput"
      class="command-input__input"
      tabindex="0"
      @keydown.enter="submitCommand"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCommand } from "@/stores/Command";

const command = useCommand();

const commandInput = ref<string>("");

function submitCommand() {
  command.executeCommand(commandInput.value);
  commandInput.value = "";
}
</script>

<style lang="scss" scoped>
.command-input {
  display: flex;
  flex-direction: column;
  gap: t.size(1);

  padding: t.size(2);

  &__label {
    @include t.typography-title;
  }

  &__status {
    margin-top: 4px;
    border-radius: t.$border-radius;
    padding: 4px 8px;

    &--success {
      background-color: t.$color-success;
    }
    &--error {
      background-color: t.$color-error;
    }
  }

  &__status-text {
    font-weight: bold;
  }

  &__input {
    border-radius: t.$border-radius;
    border: 2px solid transparent;
    padding: 4px;
    width: 100%;
    outline: none;
    font-size: 12px;
    color: t.$color-w-0;
    background-color: t.$color-g-3;
    transition: all 0.2s;

    &:hover, &:focus {
      border-color: t.$color-p-0;
    }
  }
}

.cmd-input {
  border-radius: t.$border-radius;
  padding: 8px;
  width: 100%;
  height: 100%;

  &__input-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__label {
    font-size: 120%;
    font-weight: bold;
  }
}
</style>
