import Vue from 'vue';
import ConfigManager from '@/config';

export default {
  namespaced: true,

  state: () => ({
    isShowSideBar: false,
    selectedPlace: null,
    places: [],
    isNeedPlaceReload: false,
  }),

  actions: {
    // 장소들 불러오기
    async getPlace({ commit }) {
      let places = (await Vue.prototype.$axios.get('/place')).data;

      commit('setPlaces', places);
    },
    // 한 장소 불러오기
    async getPlaceOne({ commit, state }) {
      commit('setSelectedPlace', {
        ...state.selectedPlace,
        places: [],
      });

      let places = (
        await Vue.prototype.$axios.get('/place/one', {
          x: state.selectedPlace.coord.x,
          y: state.selectedPlace.coord.y,
        })
      ).data;

      for (let i = 0; i < places.length; i++) {
        for (let j = 0; j < places[i].pictures.length; j++)
          places[i].pictures[
            j
          ].url = `${ConfigManager.config.url.file}/${places[i].pictures[j].name}`;

        console.log(places[i].pictures);
      }

      commit('setSelectedPlace', {
        ...state.selectedPlace,
        places,
      });
    },
    // 장소 삭제
    async removePlaceOne({ commit, state }, payload) {
      await Vue.prototype.$axios.delete(`/place/one/${payload}`, {
        x: state.selectedPlace.coord.x,
        y: state.selectedPlace.coord.y,
      });

      let key = null;
      let temp = [...state.selectedPlace.places];

      for (let i = 0; i < temp.length; i++) {
        if (temp[i]._id === payload) {
          key = i;
          console.log('찾음', i, payload);
        }
      }
      temp.splice(key, 1);
      console.log(payload, temp);
      commit('setSelectedPlace', {
        ...state.selectedPlace,
        places: temp,
      });
    },
  },

  mutations: {
    setIsShowSideBar(state, payload) {
      state.isShowSideBar = payload;
    },
    setSelectedPlace(state, payload) {
      state.selectedPlace = payload;
    },
    setPlaces(state, payload) {
      state.places = payload;
    },
    setIsNeedPlaceReload(state, payload) {
      state.isNeedPlaceReload = payload;
    },
  },

  getters: {
    isShowSideBar(state) {
      return state.isShowSideBar;
    },
    selectedPlace(state) {
      return state.selectedPlace;
    },
    places(state) {
      return state.places;
    },
    isNeedPlaceReload(state) {
      return state.isNeedPlaceReload;
    },
  },
};
