import Vue from "vue";
import Vuex from "vuex";
import router, { menuRoute } from "../router/index";
import createPersistedState from "vuex-persistedstate";
import cookie from "js-cookie";

Vue.use(Vuex);
const persistedState = createPersistedState({
    key: "UserInfo",
    storage: {
        getItem: key => cookie.get(key),
        setItem: (key, value) => cookie.set(key, value, { expires: 1 }),
        removeItem: key => cookie.remove(key)
    },
    paths: ["token", "path", "userId", "role"]
});
const store = new Vuex.Store({
    state: {
        isBuild: false,
        token: "",
        userId: "",
        role: "",
        path: []
    },
    getters: {
        getToken: state => state.token,
        getUserId: state => state.userId
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        setToken(state, payload) {
            state.token = payload;
        },

        changeBuild(state) {
            state.isBuild = !state.isBuild;
        },
        setUrl(state, payload) {
            state.path = payload;
        },
        setUserId(state, payload) {
            state.userId = payload;
        },
        setRole(state, payload) {
            state.role = payload;
        },
        buildDynamicRoute(state) {
            const allMenuroute = menuRoute.filter(item =>
                state.path.includes(item.path)
            );
            allMenuroute.forEach(item => {
                router.addRoute("index", item);
            });
            state.isBuild = true;
        },
        clear(state) {
            state.path = [];
            state.token = '';
            state.userId = '';
            state.role = '';
        },
    },
    plugins: [persistedState]
});
export default store;