import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ExperienceBar from "./ExperienceBar"
import { User } from "../interfaces"

function UserStats( { user } : { user? : User }) {

  return (
    <Container>
      <Row>
        <Col>{user?.name}</Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>Level {user?.level}</Col>
        <Col><ExperienceBar xp={user?.xp} nextLevelXP={user?.nextLevelXP}></ExperienceBar></Col>
      </Row>
      
    </Container>
  )
}

export default UserStats