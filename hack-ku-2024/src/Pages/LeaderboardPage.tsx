import { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard/Leaderboard";
import { User } from "../interfaces";

//const APP_URL = "https://hackku2024-lz3sc7ogqa-uc.a.run.app";

function sortByTrashCollected(a: User, b: User) {
    return b.trashCollected - a.trashCollected;
}

function LeaderboardPage() {
    const [users, setUsers] = useState<User[] | undefined>(undefined);
    
    async function handleSetUsers() {
        await fetch(`${window.location.origin}/api/users`)
          .then((res) => res.json())
          .then((data) => {
            // Sort the user list
            data.data.sort(sortByTrashCollected)
            setUsers(data.data);
            console.log(users);
          }) // Set the user state
          .catch((e) => {
            console.error("Failed to fetch user:", e);
          });
      }

    useEffect(() => {
        if (users == undefined) {
            handleSetUsers();
        }
    }, [users])

    if (!users) return (
        <>
            <p>Loading users...</p>
        </>
    )

    return (
        <>
            <h1>Leaderboard</h1>
            <Leaderboard users={users}></Leaderboard>
        </>
    );
}

export default LeaderboardPage;