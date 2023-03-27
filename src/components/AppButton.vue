<template>
  <button
      class="btn"
      :class="color"
      :type="typeBtn"
      @click="$emit('action')"
  >
    <slot/>

  </button>
</template>

<script>
export default {
  name: "AppButton",
  emits: ['action'],
  props: {
    color: {
      type: String,
      default: '',
    },
    typeBtn: {
      type: String,
      default: 'button',
    },
  },
}
</script>

<style scoped lang="scss">
.btn {
  @apply text-[1.6rem] font-medium leading-[2rem] text-white-100
  rounded-[.6rem] shadow-[0_1px_2px_1px_rgba(0,0,0,0.05)]
  py-[.9rem] px-[1.7rem] h-[3.8rem]
  flex items-center justify-center;
}
</style>