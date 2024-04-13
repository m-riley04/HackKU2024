import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ExperienceBar from "./ExperienceBar"

interface User {
    id: number
    name: string
    xp: number
    nextLevelXP: number
    level: number
}

function UserStats( { user } : { user? : User }) {

  return (
    <Container>
      <Row>
        <Col>Level {user?.level}</Col>
        <Col>{user?.name}</Col>
      </Row>
      <Row>
        <Col><ExperienceBar xp={user?.xp} nextLevelXP={user?.nextLevelXP}></ExperienceBar></Col>
      </Row>
    </Container>
  )
}

export default UserStats