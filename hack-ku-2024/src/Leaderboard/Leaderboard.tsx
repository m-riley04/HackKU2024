import { User } from "../interfaces";
import LeaderboardItem from "./LeaderboardItem";
import './Leaderboard.scss';

function Leaderboard( { users }: { users : User[] }) {

    return (
        <div className="leaderboard">
            {users.map((user, i) => <LeaderboardItem key={i} user={user} index={i+1}></LeaderboardItem>)}
        </div>
    );
}

export default Leaderboard;
