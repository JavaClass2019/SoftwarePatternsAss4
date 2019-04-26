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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/purchases`, payload)
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