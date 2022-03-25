import { GET_ONE_USER_SUCCESS, GET_USERS_SUCCESS } from './types'
import { combineReducers } from 'redux'

const initialState: object = {
  users: [],
  user: {},
  loading: true,
}

const userReducer = (state: object = initialState, action: any): object => {
  const { type, payload } = action

  switch (type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
      }
    case GET_ONE_USER_SUCCESS:
      return {
        ...state,
        user: payload[0],
        loading: false,
      }
    default:
      return state
  }
}

export default combineReducers({
  user: userReducer,
})
