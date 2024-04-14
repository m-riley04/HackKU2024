import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss'
import HomePage from './Pages/HomePage'
import CameraPage from './Pages/CameraPage';
import NotFoundPage from './Pages/NotFoundPage';
import NavigationButtons from './NavigationButtons/NavigationButtons';
import LeaderboardPage from './Pages/LeaderboardPage';
import { useEffect, useState } from 'react';
import { User } from './interfaces';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  /**
   * Sets the user hook based on a user ID
   * @param id a user Id
   */
  async function handleSetUser(id: number) {
    await fetch(`${window.location.origin}/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        console.log(user);
      }) // Set the user state
      .catch((e) => {
        console.error("Failed to fetch user:", e);
      });
  }

  //===== DEBUGGING USERS
  useEffect(() => {
    if (user == undefined) {
      // Set current user for debugging/placeholder
      const currentUserId = 1;

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
    <BrowserRouter>
      <div>
        <Routes>
          <Route index element={<HomePage user={user}/>}/>
          <Route path="camera" element={<CameraPage user={user}/>}/>
          <Route path="leaderboard" element={<LeaderboardPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </div>
      <NavigationButtons/>
    </BrowserRouter>
  );
}

export default App;
