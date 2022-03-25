import { all, call, takeLatest, put } from 'redux-saga/effects'
import { getUsersSuccess, getOneUserSuccess } from './actions'
import { GET_ONE_USER_FETCH, GET_USERS_FETCH } from './types'
import Action from './interfaces'

function* workGetUsersFetch(): any {
  const res = yield call(() =>
    fetch('https://jsonplaceholder.typicode.com/users'),
  )
  const users = yield res.json()
  yield put(getUsersSuccess(users))
}

function* workGetOneUserFetch({ payload }: Action): any {
  const res = yield call(() =>
    fetch(`https://jsonplaceholder.typicode.com/users?id=${payload}`),
  )
  const user = yield res.json()
  yield put(getOneUserSuccess(user))
}

export default function* rootSaga(): any {
  yield all([
    takeLatest(GET_USERS_FETCH, workGetUsersFetch),
    takeLatest(GET_ONE_USER_FETCH, workGetOneUserFetch),
  ])
}
