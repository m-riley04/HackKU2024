import ProgressBar from "react-bootstrap/ProgressBar";

function ExperienceBar({ xp, nextLevelXP } : { xp?: number, nextLevelXP?: number }) {

    return (
      <>
        <ProgressBar now={xp} min={0} max={nextLevelXP} label={`${xp}/${nextLevelXP}`}></ProgressBar>
      </>
    )
  }
  
  export default ExperienceBar