import { useNavigate } from "react-router";

function NavigationButtons() {
    const navigate = useNavigate();
    
    function handleLeaderboard() {
        navigate("../leaderboard")
    }

    function handleCamera() {
        navigate("../camera")
    }

    function handleHome() {
        navigate("../")
    }

    return (
        <footer style={{display: "inline-flex", margin: "auto"}}>
            <button onClick={handleLeaderboard}>Leaderboard</button>
            <button onClick={handleCamera}>Take a Picture</button>
            <button onClick={handleHome}>Home</button>
        </footer>
    )
}

export default NavigationButtons;