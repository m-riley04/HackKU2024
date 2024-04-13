import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

function SplashPage() {
    const navigate = useNavigate()
    return (
        <Container>
            <h1>Warning</h1>
            <p>Please watch where you are going while playing gLitter. We are not responsible for any kind of injury that may occur.</p>
            <button onClick={() => navigate("../")}>Accept and Continue</button>
        </Container>
    );
}

export default SplashPage;