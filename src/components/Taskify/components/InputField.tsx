import React, { useRef } from 'react'

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  addTodo: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({
  todo,
  setTodo,
  addTodo,
}): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      className="input"
      onSubmit={(e) => {
        addTodo(e)
        inputRef.current?.blur()
      }}
    >
      <input
        type="text"
        name="task"
        placeholder="Enter Task"
        className="input-box"
        value={todo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setTodo(e.target.value)
        }
        ref={inputRef}
        autoComplete={'off'}
      />
      <button type="submit" className="input-submit">
        Add
      </button>
    </form>
  )
}

export default InputField
