import Vue from "vue";
import axios from 'axios';

Vue.use(axios)

export default {
    namespaced: true,
    state() {
        return {
            errors: [],
            orders: [],
            order: {
                name: null,
                phone: null,
                email: null,
                city_id: null,
            },
        }
    },
    getters: {
        order(state) {
            return state.order
        },
        errors(state) {
            return state.errors
        },
        orders(state) {
            return state.orders
        },
    },
    actions: {
        saveOrder({commit, state}, order) {
            axios
                .post('https://finerisland.backendless.app/api/data/Users', order,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": "token-value",
                        }
                    })
                .then(response => {
                    console.log(response.data);
                    commit('addOrder', response.data)
                })
                .catch(error => {
                    console.log(error)
                    state.errors.push(error)
                    this.state.PopupModule.isPopupFormVisible = !this.state.PopupModule.isPopupFormVisible;
                    this.state.PopupModule.isPopupErrorVisible = !this.state.PopupModule.isPopupErrorVisible;
                });
        }
    },
    mutations: {
        addOrder(state, order) {
            state.orders.push(order);
        },
    }
}