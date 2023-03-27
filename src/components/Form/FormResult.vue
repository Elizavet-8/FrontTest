<template>
  <AppPopup :isVisible="isPopupResultVisible" @action="closeResultPopup">
    <template v-slot:popup__title>
      Ваши данные
    </template>
    <template v-slot:popup__body>
      <div>{{ order.name }}</div>
      <div>{{ order.phone }}</div>
      <div>{{ order.email }}</div>
      <div>{{ order.city_id }}</div>
    </template>
  </AppPopup>
</template>

<script>
import AppPopup from "@/components/AppPopup";
import {mapGetters} from "vuex";

export default {
  name: "FormResult",
  components: {
    AppPopup
  },
  computed: {
    ...mapGetters('OrderModule', ['order']),
    ...mapGetters('PopupModule', ['isPopupResultVisible']),
  },
  methods: {
    closeResultPopup() {
      this.$store.dispatch("PopupModule/showPopup", {
        mutationName: "showPopup",
        city_id: null,
        variablePopup: "isPopupResultVisible",
        visiblePopup: false
      });
    }
  },
}
</script>

<style scoped>

</style>