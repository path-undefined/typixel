<template>
  <div class="app-header">
    <svg
      class="app-header__logo"
      viewBox="0 0 90 30"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 3H3V30H9V3H12V0H0V3Z" />
      <path d="M15 0H18V21H21V0H27V21H24V30H18V21H15V0Z" />
      <path d="M45 30V0H51V30H45Z" />
      <path d="M39 3V0H30V30H36V24H39V21H36V3H39Z" />
      <path d="M39 21V3H42V21H39Z" />
      <path d="M54 21V0H60V21H63V24H66V30H60V24H57V21H54Z" />
      <path d="M63 21V0H66V21H63Z" />
      <path d="M54 30V24H57V30H54Z" />
      <path d="M69 0H78V3H75V21H78V24H75V27H78V30H69V0Z" />
      <path d="M81 30V0H87V27H90V30H81Z" />
    </svg>

    <a
      class="app-header__version"
      href="https://github.com/path-undefined/typixel"
      target="_blank"
      rel="noopener noreferrer"
    >
      v0.0.1
    </a>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: baseline;
  gap: t.size(2);

  padding: t.size(2);

  &__logo {
    width: t.size(22);
    color: t.$color-p-0;
  }

  &__version {
    color: t.$color-g-4;

    &:hover {
      color: t.$color-g-5;
    }
  }
}
</style>
