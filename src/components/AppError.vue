<template>
  <AppPopup v-if="isPopupErrorVisible" @action="closeErrorPopup">
    <template v-slot:popup__title>
      Ошибка!
    </template>
    <template v-slot:popup__body>
      <ul v-for="(index, error) in errors" :key="index">
        <li>{{ error }}</li>
      </ul>
    </template>
  </AppPopup>
</template>

<script>
import AppPopup from "@/components/AppPopup";
import {mapGetters} from "vuex";

export default {
  name: "AppError",
  components: {
    AppPopup
  },
  computed: {
    ...mapGetters('OrderModule', ['errors']),
    ...mapGetters('PopupModule', ['isPopupErrorVisible']),
  },
  methods: {
    closeErrorPopup() {
      this.$store.dispatch("PopupModule/showPopup", {
        mutationName: "showPopup",
        city_id: null,
        variablePopup: "isPopupErrorVisible",
        visiblePopup: false
      });
    }
  },
}
</script>

<style scoped>

</style>