import { useMediaQuery } from "react-responsive"

const Unauthorised = () => {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1101px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1100px)' })
    return(
        <>
       {isDesktopOrLaptop && <div style = {{display:"flex", paddingTop:"14em", flexDirection:"column"}}>
            <p style = {{ fontFamily:'F1Font', fontSize: '6em'}}>Unauthorised Access</p>
            <p style = {{fontFamily:'F1Font', fontSize: '4em'}}>Return to Home page</p>
        </div>}

        {isTabletOrMobile && <div style = {{display:"flex", paddingTop:"14em", flexDirection:"column"}}>
            <p style = {{ fontFamily:'F1Font', fontSize: '3em'}}>Unauthorised Access</p>
            <p style = {{fontFamily:'F1Font', fontSize: '2em'}}>Return to Home page</p>
        </div>}

        </>
    )
}
export default Unauthorised