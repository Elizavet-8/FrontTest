<template>
  <div class="form-group" :class="errorClass">
    <label class="form-label" :for="id">
      {{ inputLabel }}
      <span v-if="inputRequired">*</span>
    </label>
    <slot name="customInput"></slot>
    <template v-if="!$slots.customInput">
      <input class="form-input"
             :type="inputType"
             :id="id"
             :placeholder="inputPlaceholder"
             :value="value"
             @input="$emit('input', $event.target.value)"
      >
    </template>
    <small class="form-small" v-if="error">
      {{ errorText }}
    </small>
  </div>
</template>

<script>

export default {
  name: "AppFormGroup",
  // emits: [
  //   'update:modelValue'
  // ],
  props: {
    value: String,
    error: {
      type: Boolean,
      default: null,
    },
    errorText: {
      type: String,
      default: null,
    },
    errorClass: {
      type: Object,
      default: null,
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputPlaceholder: {
      type: String,
      default: '',
    },
    inputLabel: {
      type: String,
      default: '',
    },
    inputRequired: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      id: 'input-' + Math.random()
    }
  },
  // methods: {
  //   onChange(event) {
  //     this.$emit('update:modelValue', event.target.value)
  //   }
  // }
}
</script>

<style lang="scss">
.form {
  &-group {
    @apply px-[1rem];
    &_error {
      .form-label {
        @apply text-red-800;
      }
      .form-input, .form-select {
        @apply border-red-800;
      }
    }
  }

  &-small {
    @apply text-[1rem] font-medium leading-[1.1rem] text-red-800;
  }

  &-label {
    @apply block text-[1.6rem] font-medium leading-[2rem] text-gray-200 w-full mb-[4px];
  }

  &-input {
    @apply text-[1.6rem] font-medium leading-[2rem] text-gray-200 w-full
    flex items-center justify-center
    py-[.9rem] px-[1.3rem]
    h-[3.8rem] rounded-[.6rem]
    bg-white-100
    shadow-[0_1px_2px_1px_rgba(0,0,0,0.05)]
    border border-white-100 border-solid
    placeholder:font-normal placeholder:text-[1.6rem] placeholder:leading-[2rem] placeholder:text-gray-200
    focus:font-normal focus:text-[1.6rem] focus:leading-[2rem] focus:text-gray-200;
  }
}
</style>