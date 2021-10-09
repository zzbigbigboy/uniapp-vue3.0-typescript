import { InjectionKey } from 'vue';
import { ActionTree, createStore, GetterTree, MutationTree, Store, StoreOptions } from 'vuex';
import { getUserInfo } from './app';
export interface IsTempInfo {
    allHeight: number;
    statusBarHeight: number;
    titleBarHeight: number;
}
// Declare state struct
declare interface globalStore {
  userInfo: UniApp.UserInfo;
  isTemp: IsTempInfo;
}

// Define All params of StoreOptions
const globalStoreState: globalStore = {
    userInfo: getUserInfo(),
    isTemp: {} as IsTempInfo,
};

const globalStoreGetters: GetterTree<globalStore, any> = {
    userInfo: (state) => state.userInfo,
};

const globalStoreMutations: MutationTree<globalStore> = {
  UPDATE_USER_INFO(state, payload) {
    state.userInfo = payload;
  },
  UPDATE_IS_TEMP(state, payload) {
      state.isTemp = payload;
  }
};

const globalStoreActions: ActionTree<globalStore, any> = {
  updateFakeName({ commit }, payload) {
    commit('UPDATE_FAKE_NAME', payload);
  },
};

// Define StoreOptions
const globalStoreOption: StoreOptions<globalStore> = {
  state: globalStoreState,
  getters: globalStoreGetters,
  mutations: globalStoreMutations,
  actions: globalStoreActions,
};

// Defind current store key
export const globalStoreKey: InjectionKey<Store<globalStore>> = Symbol();

export default createStore<globalStore>(globalStoreOption);