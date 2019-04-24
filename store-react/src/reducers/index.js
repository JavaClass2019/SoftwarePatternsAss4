// this file contains reducers
// reducers determines how the store will change when actions are triggered
// they receive the object an action returns and use the type to determine what todo
// please refer to https://redux.js.org/basics/reducers


// this object will be used to create the initial state of the store
const initialState = {
  user: {},
  cart: []
}

export default (state = initialState, action) => {
  if (action.type === 'SET_CURRENT_USER') {
    return Object.assign({}, state, { user: action.payload })
  } else if (action.type === 'SET_AUTH_TOKEN') {
    return Object.assign({}, state, { token: action.payload })
  } else if (action.type === 'ADD_CART_ITEM') {
    return Object.assign({}, state, { cart: state.cart.concat(action.payload) })
  } else if (action.type === 'CHECKOUT_REQUEST' || action.type === 'CHECKOUT_FAILED') {
    return state
  } else if (action.type === 'CHECKOUT_COMPLETE') {
    return Object.assign({}, state, { cart: [] })
  } else if (action.type === 'LOGOUT') {
    return Object.assign({}, state, { token: '', user: {}, cart: []})
  }

  return state
}