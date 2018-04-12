import Vue from 'vue'
import Vuex from 'vuex'
import db from 'db'
import auth from 'db/auth'
Vue.use(Vuex)

const categoriesRef = db.collection('categories')

const store = new Vuex.Store({
  state: {
    userStatus: {
      loggedIn: false,
      uid: '',
      email: ''
    }
  },
  getters: {
    getUserStatus (state) {
      return state.userStatus
    }
  },
  actions: {
    monitorUserStatus ({commit}) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User signed in
          commit('SET_USER_STATUS', {loggedIn: true, uid: user.uid, email: user.email})
        } else {
          // User signed out
          commit('SET_USER_STATUS', { loggedIn: false, uid: '', email: '' })
        }
      })
    },
    login ({commit}, payload) {
      return auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      )
    },
    logout () {
      return auth.signOut()
    },
    fetchCategories ({ commit }, payload) {
      return categoriesRef.get()
    },
    addCategory ({ commit }, payload) {
      return categoriesRef.add(payload)
    }
  },
  mutations: {
    SET_USER_STATUS (state, payload) {
      state.userStatus = {...state.userStatus, ...payload}
    }
  }
})

export default store
