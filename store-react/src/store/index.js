// in this file we initialize our app's store
// we do so by using the createStore function from redux

import { createStore, applyMiddleware } from 'redux'

// import a logger which logs all state changes in the console
import { createLogger } from 'redux-logger'

// import thunk middlware which helps us when we try to make async actions
// please refer to https://redux.js.org/advanced/middleware
import thunkMiddleware from 'redux-thunk'

// import the reducers
// these we act as the guards to mutating of state
import rootReducer from  '../reducers/index'

const loggerMiddleware = createLogger()

// export the store whilst applying thunk and logging middleware 
export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))