import profilepic from '../profile.jpg'
const About = () => {
  return (
    <div style={{justifyContent:"center", width: "100%", padding: "2em"}}>
        <div style =  {{ display: "flex", justifyContent: "center", paddingTop: "2em"}}><img src={profilepic} alt="Profile Picture" className='picture'/></div>
        <div style =  {{display: "flex", justifyContent: "center", paddingTop: "1em"}}>
            <h1><font size="7">Sahil Patel</font></h1>
        </div>
        <div className='basic-info'>
             <h3 style =  {{paddingBottom: "0.5em", fontSize: "35px" }}>About Me:</h3>
            <section>
                <ul style={{listStyleType:"none", fontSize: "20px"}}>
                    <li><b>Graduation:</b> University Of Bristol</li>
                    <li><b>Degree:</b> Mechanical and Electrical Engineering (MEng)</li>
                    <li><b>Contact:</b> sahilpatel1906@gmail.com</li>
                    <li><b>Website Purpose:</b> This website is designed as a personal project to showcase my skills in frontend and backend software development</li>
                    <li><b>Github:</b> https://github.com/onlysilvercrow</li>
                    <li>download cv button</li>
                </ul>
                <a href = "CV.pdf"
                    download="CV.pdf">
                    <button>CV</button>
                </a>
            </section>
        </div>
    </div>
  )
}

export default About