import React, {
  ReactElement,
  useState,
  useRef,
  useReducer,
  Dispatch,
  SetStateAction,
} from 'react'

// 1.) Props, Hooks & Render Props
interface TestProps {
  label: string
  children: (id: number) => JSX.Element | null
}

interface Todo {
  text: string
  complete: boolean
}

type State = Todo[]

type Actions =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'REMOVE_TODO'; idx: number }

const todoReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.text, complete: false }]
    case 'REMOVE_TODO':
      return state.filter((_, i) => action.idx !== i)
    default:
      return state
  }
}

const Test: React.FC<TestProps> = ({ label, children }): ReactElement => {
  const [count, setCount]: [
    number,
    Dispatch<SetStateAction<number>>,
  ] = useState<number>(0)

  const [text, setText]: [string, Dispatch<SetStateAction<string>>] = useState<
    string
  >('')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  const [todos, dispatch] = useReducer(todoReducer, [])

  return (
    <>
      <input
        type="text"
        placeholder="Enter Todo"
        ref={inputRef}
        value={text}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => {
          setCount(count + 1)
          inputRef.current?.focus()
        }}
      >
        {label} {count}
      </button>
      <div>
        {todos.map(
          (todo: Todo, i): ReactElement => (
            <p key={i}>
              Todo #{i + 1}: {todo.text}{' '}
              <button
                type="button"
                onClick={() => {
                  dispatch({
                    type: 'REMOVE_TODO',
                    idx: i,
                  })
                }}
              >
                X
              </button>
            </p>
          ),
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: 'ADD_TODO',
            text,
          })

          setText('')
        }}
      >
        Add Todo
      </button>
      <div>{children(count)}</div>
    </>
  )
}

const TestComponent: React.FC = (): ReactElement => {
  return (
    <div className="App">
      <h1>React & TypeScript</h1>
      <Test
        label="Increment Count:"
        children={(id) => (
          <div
            style={{
              display: 'none',
            }}
          >
            {id}
          </div>
        )}
      />
    </div>
  )
}

export default TestComponent
