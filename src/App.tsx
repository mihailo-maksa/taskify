import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import About from './components/About'
import TestComponent from './practice/React'
import { Provider } from 'react-redux'
import store from './redux/store'
import Taskify from './components/Taskify'
import Phantom from './solana/Phantom'

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Taskify />} />s
        <Route path="/users" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path="/react-ts" element={<TestComponent />} />
        <Route path="/phantom" element={<Phantom />} />
      </Routes>
    </Provider>
  )
}

export default App
