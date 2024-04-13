function ExperienceBar({ xp, nextLevelXP } : { xp?: number, nextLevelXP?: number }) {

    return (
      <>
        <div className="experience-bar-container">
            <div className="experience-bar">
            <div className="experience-bar-fill">{xp} / {nextLevelXP} xp</div>
            </div>
        </div>
      </>
    )
  }
  
  export default ExperienceBar