/**
 * We purposely added 2 reducers for the example of combineReducers method.
 * There can be only 1 or even more than 2 reducers.
 * combineReducers defines the structure of the store object.
 */
import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { ratesheetReducer } from './ratesheetReducer'

export const rootReducer = combineReducers({
  user: userReducer,
  ratesheet: ratesheetReducer
})
