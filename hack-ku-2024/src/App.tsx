import "./App.css";
import { useEffect, useState } from "react";
import UserStats from "./UserStats/UserStats";
import QuickMap from "./Map/QuickMap";

interface User {
  id: number;
  name: string;
  xp: number;
  nextLevelXP: number;
  level: number;
}

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  async function handleSetUser(id: number) {
    await fetch(`http://localhost:8080/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        console.log(user);
      }) // Set the user state
      .catch((e) => {
        console.error("Failed to fetch user:", e);
      });
  }

  useEffect(() => {
    if (user == undefined) {
      // Set current user for debugging/placeholder
      const currentUserId = 3;

      // Get the current user from the database
      handleSetUser(currentUserId);
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <p>Loading user...</p>
      </>
    );
  }

  return (
    <>
      <UserStats user={user}></UserStats>
      <div>
        <h1>{user.name}</h1>
        <QuickMap />
        <button>Click here to play</button>
      </div>
    </>
  );
}

export default App;
