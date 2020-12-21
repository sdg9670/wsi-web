export default {
  namespaced: true,

  state: () => ({
    email: null,
    nickname: null,
  }),

  actions: {
    getAuth() {},
  },

  mutations: {
    setEmail(state, payload) {
      state.email = payload;
    },
    setNickname(state, payload) {
      state.nickname = payload;
    },
  },

  getters: {
    email(state) {
      return state.email;
    },
    nickname(state) {
      return state.nickname;
    },
  },
};
