<template>
  <div class="popup" v-if="isVisible">
    <div class="popup__body">
      <h2 class="popup__title">
        <slot name="popup__title"></slot>
      </h2>
      <slot name="popup__body"></slot>
    </div>
    <div class="popup__overflow" @click="$emit('action')"></div>
  </div>
</template>

<script>


export default {
  name: "AppPopup",
  emits: ['action'],
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped lang="scss">
.popup {
  @apply fixed inset-0
  w-full h-full
  flex items-center justify-center;

  &__overflow {
    @apply bg-bgshadow absolute inset-0 z-40
    w-full h-full;
  }

  &__body {
    box-shadow: 0px 2rem 2.5rem -5px rgba(0, 0, 0, 0.1), 0px 1rem 1rem -5px rgba(0, 0, 0, 0.04);
    @apply bg-white-100 relative z-50
    pt-[2.4rem] pb-[2.7rem] px-[2.4rem]
    w-full max-w-[79.3rem]
    rounded-[.8rem];
  }

  &__title {
    @apply text-back text-[2.4rem] leading-[2.4rem] font-medium;
  }
}

@media only screen and (max-width: 744px) {
  .popup {
    &__body {
      @apply pb-[3.3rem] max-w-[66.9rem];
    }
  }
}

@media only screen and (max-width: 428px) {
  .popup {
    &__body {
      @apply pb-[2.2rem] max-w-[33.5rem];
    }
  }
}

</style>