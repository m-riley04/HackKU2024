import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import glassIcon from "../../images/Small_glass.gif"
import plasticIcon from "../../images/SmolH20.gif"
import paperIcon from "../../images/Small_paper.gif"

function ScanResults({ material, fact, recyclable } : { material?: string, fact?: string, recyclable?: boolean}) {
    const [imagePath, setImagePath] = useState("");

    useEffect(() => {
        if (material === "glass") {
            setImagePath(glassIcon);
        } else if (material === "plastic") {
            setImagePath(plasticIcon);
        } else if (material === "paper") {
            setImagePath(paperIcon);
        } else {
            setImagePath(paperIcon);
        }
    }, [material])

    return(
        <Container>
            <Row>
                <Col><img src={imagePath} width="75px" height="75px"></img></Col>
                <Col>Material: <b>{material}</b></Col>
                <Col>Recyclable: {(recyclable == true) ? <b>Yes</b> : <b>False</b>}</Col>
            </Row>
            <Row>
                <Col>Fact: {fact}</Col>
            </Row>
        </Container>
    )
}

export default ScanResults;