import { useState } from 'react'
import './App.css'
import GameUI from './GameUI.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameUI />
    </>
  )
}

export default App
