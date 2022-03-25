import React, { useState } from 'react'
import InputField from './components/InputField'
import './Taskify.scss'
import Todo from './model'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const Taskify: React.FC = (): JSX.Element => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [id, setId] = useState<number>(0)

  const addTodo = (e: React.FormEvent): void => {
    e.preventDefault()

    if (todo) {
      setTodos([
        ...todos,
        {
          todo,
          id,
          isDone: false,
        },
      ])
      setId(id + 1)
      setTodo('')
    } else {
      alert('Enter a task first!')
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let add
    let active = todos
    let complete = completedTodos

    if (source.droppableId === 'ActiveTasks') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'ActiveTasks') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="taskify">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} addTodo={addTodo} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default Taskify
