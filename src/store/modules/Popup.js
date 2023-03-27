import Vue from "vue";
import axios from 'axios';

Vue.use(axios)

export default {
    namespaced: true,
    state() {
        return {
            isPopupFormVisible: false,
            isPopupResultVisible: false,
            isPopupErrorVisible: false,
        }
    },
    getters: {
        isPopupFormVisible(state) {
            return state.isPopupFormVisible
        },
        isPopupResultVisible(state) {
            return state.isPopupResultVisible
        },
        isPopupErrorVisible(state) {
            return state.isPopupErrorVisible
        }
    },
    mutations: {
        showPopupResult: function (state) {
            state.isPopupFormVisible = !state.isPopupFormVisible;
            state.isPopupResultVisible = !state.isPopupResultVisible;
        },
        showPopup: function (state, payload) {
            state[payload.variablePopup] = !state[payload.variablePopup]
            if (payload.visiblePopup === true) {
                this.state.OrderModule.order.city_id = payload.city_id;
            } else {
                this.state.OrderModule.order.name = null
                this.state.OrderModule.order.phone = null
                this.state.OrderModule.order.email = null
                this.state.OrderModule.order.city_id = payload.city_id
            }
        },
    },
    actions: {
        showPopupResult({commit}) {
            commit('showPopupResult');
        },
        showPopup({commit}, payload) {
            commit(payload.mutationName, payload);
        }
    },
}