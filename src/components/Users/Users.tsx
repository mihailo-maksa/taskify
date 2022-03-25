import React, {
  useState,
  ReactElement,
  SetStateAction,
  ChangeEvent,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersFetch, getOneUserFetch } from '../../redux/actions'
import './Users.scss'

interface User {
  id: number
  name: string
  username: string
  email: string
  address: any
  phone: string
  website: string
  company: any
}

interface UserState {
  users: User[]
  user: User
  loading: boolean
}

interface State {
  user: UserState
}

const Users: React.FC = (): ReactElement => {
  const [id, setId] = useState<number>(0)
  const { users, user } = useSelector((state: State): UserState => state.user)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>Home</h1>

      <button type="button" onClick={() => dispatch(getUsersFetch())}>
        Get Users
      </button>

      <h2>Users:</h2>
      {users.map((user: User) => (
        <p key={user.id}>{user.name}</p>
      ))}

      <br />

      <h2>Get User's Email</h2>
      <label htmlFor="id">User ID: </label>
      <input
        type="number"
        name="id"
        id="id"
        value={id}
        onChange={(e: ChangeEvent<any>): SetStateAction<any> =>
          setId(e.target.value)
        }
        style={{
          marginLeft: '5px',
          marginRight: '10px',
        }}
      />
      <button type="button" onClick={() => dispatch(getOneUserFetch(id))}>
        Get User's Email
      </button>
      <p>
        <span className="email">Email: </span>
        {user.email}
      </p>
    </div>
  )
}

export default Users
