import { User } from "../interfaces";

function LeaderboardItem( { user, index } : { user: User, index: number}) {

    return (
        <div>
            <p>{index}) {user.name} - {user.trashCollected}</p>
        </div>
    );
}

export default LeaderboardItem;