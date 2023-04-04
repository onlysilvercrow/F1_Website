import { useMediaQuery } from "react-responsive"

const Missing = () => {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1101px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1100px)' })
    return(
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%"}}>
            {isDesktopOrLaptop && <p style = {{ fontFamily:'F1Font', fontSize: '6em', textAlign: "center"}}>Page Not Found</p>}
    
            {isTabletOrMobile && <p style = {{ fontFamily:'F1Font', fontSize: '3em', textAlign: "center"}}>Page Not Found</p>}
    
        </div>
    )
}
export default Missing