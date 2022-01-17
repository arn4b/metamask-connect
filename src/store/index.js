// import Vue from 'vue';
// import Vuex from 'vuex';
import Identicon from 'identicon.js';
import { createStore } from 'vuex'


// Vue.use(Vuex);

import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {
    /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
    network: "", // optional
    cacheProvider: false, // optional
    providerOptions, // required
});

export default createStore({
    state: {
        web3ModalProvider: null,
        web3provider: null,
        activeAccountAddress: null,
        activeAccountBalance: null,
        accountImage: null
    },

    mutations: {
        SET_WEB3_MODAL_PROVIDER(state, web3ModalProviderObject) {
            state.web3ModalProvider = web3ModalProviderObject
        },

        SET_WEB3_PROVIDER(state, web3ProviderObject) {
            state.web3provider = web3ProviderObject
        },

        SET_ACTIVE_ACCOUNT_ADDRESS(state, activeAccountAddress) {
            state.activeAccountAddress = activeAccountAddress
        },

        SET_ACTIVE_ACCOUNT_BALANCE(state, activeAccountBalance){
            state.activeAccountBalance = activeAccountBalance
        },

        SET_IMAGE(state, accountImage) {
            state.accountImage = accountImage
        }

    }, 

    actions: {
        async initLogin({ commit }) {
            if(!window.ethereum)
                throw { message: "ERROR_MSG.METAMASK_NOT_INSTALLED" }

            const provider = await web3Modal.connect();
            commit('SET_WEB3_MODAL_PROVIDER', provider)

            const web3 = new Web3(provider);
            commit('SET_WEB3_PROVIDER', web3)

            const activeAccounts = await web3.eth.getAccounts()
            commit('SET_ACTIVE_ACCOUNT_ADDRESS', activeAccounts[0])

            const balance = await web3.eth.getBalance(activeAccounts[0])
            commit('SET_ACTIVE_ACCOUNT_BALANCE', balance)

            const imgdata = new Identicon(activeAccounts[0]).toString();
            commit('SET_IMAGE', imgdata)
        },

        async initLogout({ commit }) {
            commit('SET_WEB3_MODAL_PROVIDER', null)
            commit('SET_WEB3_PROVIDER', null)
            commit('SET_ACTIVE_ACCOUNT_ADDRESS', null)
            commit('SET_ACTIVE_ACCOUNT_BALANCE', null)
        }
    },

    getters: {
        isLoggedIn(state) {
            return !!state.activeAccountAddress
        }
    }
});