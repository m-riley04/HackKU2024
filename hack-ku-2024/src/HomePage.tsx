import './App.scss'
import { useEffect, useState } from "react"
import UserStats from './UserStats/UserStats'
import { Button } from 'react-bootstrap'
import QuickMap from './Map/QuickMap'
import { User } from "./interfaces"

function HomePage() {
  const [user, setUser] = useState<User | undefined>(undefined);

  /**
   * Sets the user hook based on a user ID
   * @param id a user Id
   */
  async function handleSetUser(id:number) {
    await fetch(`http://localhost:8080/api/users/${id}`)
    .then(res => res.json())
    .then(data => { setUser(data.data); console.log(user) }) // Set the user state
    .catch(e => {
      console.error("Failed to fetch user:", e);
    });
  }

  useEffect(() => {
    if (user == undefined) {
      // Set current user for debugging/placeholder
      const currentUserId = 1;

      // Get the current user from the database
      handleSetUser(currentUserId)
    }
  }, [user]);

  if (!user) {
    return <><p>Loading user...</p></>
  }

  return (
    <>
      <UserStats user={user}></UserStats>
      <QuickMap></QuickMap>
      <Button>Open Camera</Button>
    </>
  )
}

export default HomePage
