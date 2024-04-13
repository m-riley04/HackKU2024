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

  async function handleSetUser(id:number) {
    await fetch(`http://localhost:8080/api/users/${id}`)
    .then(res => res.json())
    .then(data => { setUser(data.data); console.log(user) }) // Set the user state
    .catch(e => {
      console.error("Failed to fetch user:", e);
    });
  }

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
