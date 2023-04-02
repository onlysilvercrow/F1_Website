import profilepic from '../profile.jpg'
const About = () => {
  return (
    <>
    <div style =  {{ display: "flex", justifyContent: "center", paddingTop: "2em", zIndex: "1",  position: "relative"}}><img src={profilepic} alt="Profile Picture" className='picture'/></div>
        <div style =  {{display: "flex", justifyContent: "center", paddingTop: "1em", zIndex: "1",  position: "relative"}}>
            <h1><font size="7">Sahil Patel</font></h1>
        </div>
        <div className='basic-info'>
             <h3 style =  {{paddingRight: "3em", fontSize: "35px" }}>About Me:</h3>
            <section>
                <ul style={{listStyleType:"none", fontSize: "20px"}}>
                    <li><b>Graduation:</b> University Of Bristol</li>
                    <li><b>Degree:</b> Mechanical and Electrical Engineering (MEng)</li>
                    <li><b>Contact:</b> sahilpatel1906@gmail.com</li>
                    <li><b>Website Purpose:</b> This website is designed as a personal project to showcase my skills in frontend and backend software development</li>
                </ul>
            </section>
        </div>
    </>
  )
}

export default About