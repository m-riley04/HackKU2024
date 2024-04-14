import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ExperienceBar from "./ExperienceBar";
import { User } from "../interfaces";
import "bootstrap/dist/css/bootstrap.css";
import "./UserStats.scss";

function UserStats({ user }: { user?: User }) {
  return (
    <Container className="userstats">
      <Row className="">
        <Col className="avatar">
          <Image src="../images/avatar.png" roundedCircle />
        </Col>

        <Col className="levelcol">
          <Container>
          <Row className="username">
            <p>
              {user?.name} ⋅ Level {user?.level}
            </p>
          </Row>
          <Row className="xpbar">
            <ExperienceBar
              xp={user?.xp}
              nextLevelXP={user?.nextLevelXP}
            ></ExperienceBar>
          </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default UserStats;
