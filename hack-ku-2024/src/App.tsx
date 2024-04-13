import './App.css'
import { useEffect, useState } from "react"
import UserStats from './UserStats/UserStats'

interface User {
  id: number
  name: string
  xp: number
  nextLevelXP: number
  level: number
}

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);


  return (
    <>
      <div>
        <h1>recycle.me</h1>
        <button>Click here to play</button>
      </div>
    </>
  )
}

export default App
