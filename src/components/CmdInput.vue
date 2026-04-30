<template>
  <div class="cmd-input">
    <label class="cmd-input__input-container">
      <span class="cmd-input__label">
        Command Input
      </span>
      <input class="cmd-input__input">
    </label>
  </div>
</template>

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
    border: none;
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
  }
}
</style>
