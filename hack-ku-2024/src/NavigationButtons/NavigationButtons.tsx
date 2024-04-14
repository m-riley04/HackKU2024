import { useNavigate } from "react-router";
import PictureButton from "./PictureButton";
import "./NavigationButtons.scss"

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
        <div style={{display: "inline-flex", margin: "auto"}}>
            <PictureButton onClick={handleLeaderboard} alt="Leaderboard"/>
            <PictureButton onClick={handleCamera} alt="Camera"/>
            <PictureButton onClick={handleHome} alt="Home"/>
        </div>
    )
}

export default NavigationButtons;