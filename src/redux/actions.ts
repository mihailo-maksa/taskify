import {
  GET_USERS_FETCH,
  GET_USERS_SUCCESS,
  GET_ONE_USER_FETCH,
  GET_ONE_USER_SUCCESS,
} from './types'
import Action from './interfaces'

export const getUsersFetch = (): Action => ({
  type: GET_USERS_FETCH,
})

export const getUsersSuccess = (users: object[]): Action => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const getOneUserFetch = (id: number): Action => ({
  type: GET_ONE_USER_FETCH,
  payload: id,
})

export const getOneUserSuccess = (user: object[]): Action => ({
  type: GET_ONE_USER_SUCCESS,
  payload: user,
})
