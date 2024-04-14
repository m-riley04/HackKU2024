import { Col, Row } from "react-bootstrap";
import { User } from "../interfaces";
import './Leaderboard.scss';

function LeaderboardItem( { user, index } : { user: User, index: number}) {

    return (
        <div className="leaderboard-item">
            <Row>
            <Col>
            <p>{index}) {user.name}</p>
            </Col>
            <Col className="collected">
            <p>{user.trashCollected}</p>
            </Col>
            </Row>
        </div>
    );
}

export default LeaderboardItem;
