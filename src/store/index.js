import Vue from 'vue'
import Vuex from 'vuex'
import bus from '@/bus'
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
    },
    categories: []
  },
  getters: {
    getUserStatus (state) {
      return state.userStatus
    },
    getCategories (state) {
      return state.categories
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
    fetchCategories ({ commit }) {
      return categoriesRef.get()
    },
    monitorCategories ({ commit }) {
      categoriesRef.orderBy('date', 'desc')
        .onSnapshot((snapshot) => {
          bus.$emit(`syncing categories`)
          commit('RESET_CATEGORIES')
          snapshot.forEach((doc) => {
            let data = doc.data()
            let id = doc.id
            let category = { ...data, id }
            bus.$emit(`synced categories`)
            commit('SET_CATEGORIES', category)
          })
        })
    },
    addCategory ({ commit }, categoryData) {
      return categoriesRef.add(categoryData)
    },
    editCategory ({commit}, payload) {
      let id = payload.id
      let formData = payload.form
      return categoriesRef.doc(id).set(formData)
    },
    deleteCategory ({commit}, categoryId) {
      return categoriesRef.doc(categoryId).delete()
    },
    addItemInCategory ({commit}, payload) {
      let categoryRef = categoriesRef.doc(payload.categoryId).collection('items')
      return categoryRef.add(payload.itemData)
    }
  },
  mutations: {
    SET_USER_STATUS (state, payload) {
      state.userStatus = {...state.userStatus, ...payload}
    },
    RESET_CATEGORIES (state) {
      state.categories = []
    },
    SET_CATEGORIES (state, payload) {
      state.categories.push(payload)
    }
  }
})

export default store
