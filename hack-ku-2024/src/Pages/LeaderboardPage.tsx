import { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard/Leaderboard";
import { User } from "../interfaces";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

/**
 * Sorting method for the leaderboard
 * @param a a user
 * @param b another user
 * @returns the difference between the trash collected of b and a
 */
function sortByTrashCollected(a: User, b: User) {
    return b.trashCollected - a.trashCollected;
}

function LeaderboardPage() {
    const [users, setUsers] = useState<User[] | undefined>(undefined);
    
    /**
     * Handles the setting of the user list for the leaderboard
     */
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
            <LoadingIcon></LoadingIcon>
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