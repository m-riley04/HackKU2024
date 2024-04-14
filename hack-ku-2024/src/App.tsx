import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./Pages/HomePage";
import CameraPage from "./Pages/CameraPage";
import NotFoundPage from "./Pages/NotFoundPage";
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import LeaderboardPage from "./Pages/LeaderboardPage";
import { useEffect, useState } from "react";
import { User } from "./interfaces";
import { Button, Container, Form } from "react-bootstrap";
import LoadingIcon from "./LoadingIcon/LoadingIcon";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

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

  /**
   * Handles the log in process
   */
  function handleLogIn() {
    setLoggedIn(true);
  }

  useEffect(() => {
    if (loggedIn == true) {
      // Set current user for debugging/placeholder
      const currentUserId = 1;

      // Get the current user from the database
      handleSetUser(currentUserId);
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <Container style={{ alignItems: "center", marginTop: "35vh" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button
            onClick={handleLogIn}
            style={{
              width: "100px",
              backgroundColor: "#7a997e",
              color: "#222",
              fontSize: "0.9em",
            }}
          >
            {" "}
            Log In{" "}
          </Button>
        </Form>
      </Container>
    );
  }

  if (!user) {
    return (
      <>
        <p>Loading user...</p>
        <LoadingIcon></LoadingIcon>
      </>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route index element={<HomePage user={user} />} />
          <Route path="camera" element={<CameraPage user={user} />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <NavigationButtons />
    </BrowserRouter>
  );
}

export default App;
