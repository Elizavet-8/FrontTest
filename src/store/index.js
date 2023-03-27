import Vue from 'vue'
import Vuex from 'vuex'
import OrderModule from "./modules/Order";
import PopupModule from "./modules/Popup";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        OrderModule,
        PopupModule
    },
})
