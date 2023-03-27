<template>
  <div>
    <AppPopup :isVisible="isPopupFormVisible" @action="closeFormPopup">
      <template v-slot:popup__title>
        Заказать звонок
      </template>
      <template v-slot:popup__body>
        <form class="popup__form"
              @submit.prevent="createOrder"
        >
          <FormGroup
              class="popup__form-group"
              inputType="text"
              inputPlaceholder="Иван Иванов"
              inputLabel="Имя"
              v-model="order.name"
              :error="($v.order.name.$dirty && !$v.order.name.required) || ($v.order.name.$dirty && !$v.order.name.minLength)"
              :errorText="'Поле не должно быть пустым'"
              :errorClass="{'form-group_error': ($v.order.name.$dirty && !$v.order.name.required) || ($v.order.name.$dirty && !$v.order.name.minLength)}"
          ></FormGroup>
          <FormGroup
              class="popup__form-group"
              inputLabel="Телефон"
              :error="($v.order.phone.$dirty && !$v.order.phone.required) || ($v.order.phone.$dirty && !$v.order.phone.minLength)"
              :errorText="'Поле не должно быть пустым'"
              :errorClass="{'form-group_error': ($v.order.phone.$dirty && !$v.order.phone.required) || ($v.order.phone.$dirty && !$v.order.phone.minLength)}"
          >
            <template v-slot:customInput>
              <the-mask class="form-input"
                        v-model="$v.order.phone.$model"
                        placeholder="+7 (___) ___-__-__"
                        type="tel"
                        :mask="'+7 (###) ###-##-##'"
              />
            </template>
          </FormGroup>
          <FormGroup
              class="popup__form-group"
              inputType="email"
              inputPlaceholder="you@example.com"
              inputLabel="Email"
              v-model="$v.order.email.$model"
              :error="$v.order.email.$dirty && !$v.order.email.required || $v.order.email.$dirty && !$v.order.email.email"
              :errorText="'Поле не должно быть пустым'"
              :errorClass="{'form-group_error': ($v.order.email.$dirty && !$v.order.email.required) || ($v.order.email.$dirty && !$v.order.email.email)}"
          ></FormGroup>
          <FormGroup
              class="popup__form-group popup__form-group_select"
              inputLabel="Город"
              :error="$v.order.city_id.$dirty && !$v.order.city_id.required"
              :errorText="'Поле не должно быть пустым'"
              :errorClass="{'form-group_error': ($v.order.city_id.$dirty && !$v.order.city_id.required)}"
          >
            <template v-slot:customInput>
              <select class="popup__select form-select" v-model="$v.order.city_id.$model">
                <option v-for="option in city_ids" :value="option.id">{{ option.name }}</option>
              </select>
            </template>
          </FormGroup>
          <AppButton
              class="popup__btn"
              color="bg-mint"
              typeBtn="submit"
          >
            Отправить
          </AppButton>
        </form>
      </template>
    </AppPopup>
    <FormResult></FormResult>
    <AppError></AppError>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {validationMixin} from 'vuelidate';
import {required, minLength, email} from 'vuelidate/lib/validators';
import AppPopup from "@/components/AppPopup";
import AppButton from "@/components/AppButton";
import FormResult from "@/components/Form/FormResult";
import AppError from "@/components/AppError";
import FormGroup from "@/components/Form/FormGroup";
import {TheMask} from 'vue-the-mask'
import {mask} from 'vue-the-mask'

export default {
  name: "FormPopup",
  computed: {
    ...mapGetters('OrderModule', ['order']),
    ...mapGetters('PopupModule', ['isPopupFormVisible', 'isPopupResultVisible']),
    ...mapGetters('PopupModule', ['isPopupFormVisible', 'isPopupResultVisible']),
  },
  mixins: [validationMixin],
  data: () => ({
    city_ids: [
      {
        id: 1,
        name: "Москва"
      },
      {
        id: 2,
        name: "Санкт-Петербург"
      },
      {
        id: 3,
        name: "Казань"
      }
    ],
    comments: [],
    random: Math.random()
  }),
  validations: {
    order: {
      name: {
        required,
        minLength: minLength(4)
      },
      phone: {
        required,
        minLength: minLength(10)
      },
      email: {
        required,
        email
      },
      city_id: {
        required,
      }
    }
  },
  methods: {
    createOrder() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('-')
      } else {
        this.$store.dispatch('OrderModule/saveOrder', {
          name: this.order.name,
          phone: '+7' + this.order.phone,
          email: this.random + this.order.email,
          city_id: this.order.city_id,
          password: 'liza' + this.random,
        });
        this.$store.dispatch('PopupModule/showPopupResult')
      }
    },
    closeFormPopup() {
      this.$store.dispatch("PopupModule/showPopup", {
        mutationName: "showPopup",
        city_id: null,
        variablePopup: "isPopupFormVisible",
        visiblePopup: false
      });
    }
  },
  directives: {mask},
  components: {
    TheMask,
    AppButton,
    FormGroup,
    AppPopup,
    FormResult,
    AppError,
  },
}
</script>

<style lang="scss">
.popup {
  &__form {
    @apply grid grid-cols-4 mx-[-1rem] mt-[2.3rem];
  }

  &__btn {
    @apply last:mr-[1rem] ml-auto mt-[1.8rem] col-start-4;
  }

  &__select {
    @apply appearance-none block
    bg-white-100 bg-clip-padding bg-no-repeat
    rounded transition ease-in-out m-0 focus:outline-none
    text-[1.6rem] font-medium leading-[2rem] text-gray-200 w-full
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

@media only screen and (max-width: 744px) {
  .popup {
    &__form {
      @apply grid grid-cols-3 mx-[-1.3rem] mt-[1.9rem];
    }

    &__btn {
      @apply last:mr-[1rem] ml-auto mt-[1.8rem] col-start-3 w-full mt-auto mb-0;
    }

    &__form-group {
      @apply mb-[2rem];
      &_select {
        @apply col-start-1 col-end-3 mb-0;
      }
    }
  }
}

@media only screen and (max-width: 744px) {
  .popup {
    &__form {
      @apply grid-cols-3 mt-[2.9rem];
    }

    &__btn {
      @apply col-start-3 w-full mt-auto mb-0;
    }

    &__form-group {
      @apply mb-[2rem];
      &_select {
        @apply col-start-1 col-end-3 mb-0;
      }
    }
  }
}

@media only screen and (max-width: 428px) {
  .popup {
    &__form {
      @apply grid-cols-1 mx-[0] mt-[3.6rem];
    }

    &__btn {
      @apply col-start-1 mb-[2rem];
    }

    &__form-group {
      @apply px-0;
      &_select {
        @apply col-start-1 col-end-2 mb-[2rem];
      }
    }
  }
}
</style>