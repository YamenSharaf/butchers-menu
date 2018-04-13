import Vue from 'vue'
import Vuex from 'vuex'
import bus from '@/bus'
import db from 'db'
import auth from 'db/auth'
Vue.use(Vuex)
const uuid = require('uuid/v1')

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
    monitorItems ({ commit }, categoryId) {
      let categoryRef = categoriesRef.doc(categoryId).collection('items')
      return categoryRef.orderBy('date', 'desc')
        .onSnapshot((snapshot) => {
          return snapshot.forEach((doc) => {
            let data = doc.data()
            let id = doc.id
            let item = { ...data, id }
            console.log('item', item)
            return item
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
      let categoryData = payload.categoryData
      let existingItems = categoryData.items
      let newItem = payload.itemData
      let newItemWithId = { ...newItem, id: uuid() }
      let allItems = [...existingItems, newItemWithId]
      categoryData.items = allItems
      return categoriesRef.doc(payload.categoryData.id).set(categoryData)
    },
    updateItemInCategory ({commit}, payload) {
      let categoryData = payload.categoryData
      let itemData = payload.itemData
      let existingItems = categoryData.items
      existingItems.forEach((item) => {
        if (item.id === itemData.id) {
          item = itemData
        }
      })
      console.log('edited', existingItems)
      categoryData.items = existingItems
      return categoriesRef.doc(payload.categoryData.id).set(categoryData)
    },
    deleteItemInCategory ({commit}, payload) {
      let categoryData = payload.categoryData
      let itemId = payload.itemId
      console.log({ categoryData, itemId })
      let existingItems = categoryData.items
      let updatedItems = existingItems.filter((item) => {
        return item.id !== itemId
      })
      console.log('updated after delete', updatedItems)
      categoryData.items = updatedItems
      return categoriesRef.doc(payload.categoryData.id).set(categoryData)
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
