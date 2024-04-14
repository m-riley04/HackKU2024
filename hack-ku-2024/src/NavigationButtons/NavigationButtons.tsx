import { useNavigate } from "react-router";
import "./NavigationButtons.scss"
import leaderboardIcon from "../../images/leaderboard.png"
import cameraIcon from "../../images/camera.png"
import homeIcon from "../../images/home.png"

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
        <div className="buttonContainer">
            <button onClick={handleLeaderboard} style={{backgroundImage: leaderboardIcon}}><img src={leaderboardIcon}/></button>
            <button onClick={handleCamera}  style={{backgroundImage: cameraIcon}} className="cameraButton"><img src={cameraIcon}/></button>
            <button onClick={handleHome}  style={{backgroundImage: homeIcon}}><img src={homeIcon}/></button>
        </div>
    )
}

export default NavigationButtons;