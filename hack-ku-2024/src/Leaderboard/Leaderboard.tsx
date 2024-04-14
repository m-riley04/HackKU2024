import { User } from "../interfaces";
import LeaderboardItem from "./LeaderboardItem";

function Leaderboard( { users }: { users : User[] }) {

    return (
        <div>
            {users.map((user, i) => <LeaderboardItem key={i} user={user} index={i+1}></LeaderboardItem>)}
        </div>
    );
}

export default Leaderboard;
