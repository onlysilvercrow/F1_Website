import { useMediaQuery } from "react-responsive"

const Logout = () => {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1101px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1100px)' })
    
    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
       {isDesktopOrLaptop && <div style = {{display:"flex", flexDirection:"column"}}>
            <p style = {{ fontFamily:'F1Font', fontSize: '6em', textAlign: "center"}}>Logging Out...</p>
        </div>}

        {isTabletOrMobile && <div style = {{display:"flex", flexDirection:"column"}}>
            <p style = {{ fontFamily:'F1Font', fontSize: '3em', textAlign: "center"}}>Logging Out...</p>
        </div>}

        </div>
    )
}

export default Logout