import React, { useState, useRef, useEffect } from 'react'
import Todo from '../model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number
}

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  index,
}): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false)
  const [newTodo, setNewTodo] = useState<string>(todo.todo)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  const editTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: newTodo } : todo)),
    )
    setEdit(false)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    )
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`single-todo ${snapshot.isDragging ? 'drag' : ''}`}
          key={todo.id}
          onSubmit={(e) => editTodo(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              type="text"
              name="newtTask"
              className="single-todo-edit"
              value={newTodo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setNewTodo(e.target.value)
              }
              autoComplete={'off'}
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todo-text">
              <strong>Task #{index + 1}:</strong> {todo.todo}
            </s>
          ) : (
            <span className="todo-text">
              <strong>Task #{index + 1}:</strong> {todo.todo}
            </span>
          )}
          <div>
            <span
              className="icon"
              title="Edit Task"
              onClick={() => {
                if (todo.isDone === false) {
                  setEdit(!edit)
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="icon"
              title="Delete Task"
              onClick={() => deleteTodo(todo.id)}
            >
              <AiFillDelete />
            </span>
            <span
              className="icon"
              title="Mark as Completed"
              onClick={() => handleDone(todo.id)}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
