// this file contains actions
// actions are a React terminology
// it refers to functions that trigger changes to the store
// actions can contain normal code but must return an object
// this object contains the type of action and any data it delivers
// please refer to https://redux.js.org/basics/actions

// axios is a library that allows us to make asynchronous requests
// in this case it is being used to make async HTTP requests
import axios from 'axios'

export function setCurrentUser (payload) {
  return { type: 'SET_CURRENT_USER', payload }
}

export function setAuthorizationToken (payload) {
  return { type: 'SET_AUTH_TOKEN', payload }
}

export function addCartItem (payload) {
  return { type: 'ADD_CART_ITEM', payload }
}

export function checkoutRequest () {
  return { type: 'CHECKOUT_REQUEST' }
}

export function checkoutComplete () {
  return { type: 'CHECKOUT_COMPLETE' }
}

export function checkoutFailed () {
  return { type: 'CHECKOUT_FAILED' }
}

export function checkout (payload) {
  return async dispatch => {
    dispatch(checkoutRequest())
    try {
      const response = await axios.post('http://localhost:3001/purchases', payload)
      return (response.status === 204) ? dispatch(checkoutComplete()) : dispatch(checkoutFailed())
    } catch (e) {
      console.error(e.message)
      dispatch(checkoutFailed())
    }
  }
}

export function logout () {
  return { type: 'LOGOUT' }
}