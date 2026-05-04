<template>
  <div class="cmd-input">
    <label class="cmd-input__input-container">
      <span class="cmd-input__label">
        Command Input
      </span>
      <div
        v-if="command.lastCommandResult"
        class="cmd-input__status"
        :class="{
          'cmd-input__status--success': command.lastCommandResult.successful,
          'cmd-input__status--error': !command.lastCommandResult.successful,
        }"
      >
        <span class="cmd-input__status-text">
          {{ command.lastCommandResult.successful ? "SUCCESSFUL" : "ERROR" }}
        </span>

        {{ command.lastCommandResult.message }}
      </div>
      <input
        v-model="commandInput"
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

const command = useCommand();

const commandInput = ref<string>("");

function submitCommand() {
  command.executeCommand(commandInput.value);
  commandInput.value = "";
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
    font-size: 110%;
    font-weight: bold;
  }

  &__input {
    margin-top: 4px;
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
}
</style>
