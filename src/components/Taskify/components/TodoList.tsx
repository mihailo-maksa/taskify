import React from 'react'
import Todo from '../model'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}): JSX.Element => {
  return (
    <div className="todos-container">
      <Droppable droppableId="ActiveTasks">
        {(provided, snapshot) => {
          return (
            <div
              className={`todos ${
                snapshot.isDraggingOver ? 'drag-active' : ''
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos-heading">Active Tasks</span>
              {todos.map((todo, i) => (
                <SingleTodo
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                  index={i}
                />
              ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>

      <Droppable droppableId="CompletedTasks">
        {(provided, snapshot) => {
          return (
            <div
              className={`todos removed ${
                snapshot.isDraggingOver ? 'drag-completed' : ''
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos-heading">Completed Tasks</span>
              {completedTodos.map((todo, i) => (
                <SingleTodo
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  index={i}
                />
              ))}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}

export default TodoList
