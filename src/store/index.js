import Vue from 'vue';
import Vuex from 'vuex';
import mainStore from './main';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { main: mainStore },
});
