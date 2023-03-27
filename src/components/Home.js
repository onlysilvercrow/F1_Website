import useAuth from "../hooks/useAuth";
const Home = () => {
    const auth = useAuth()
    return(
    <div className="home-body">
        <div>
            <h1><font size="7">Welcome</font></h1>
        </div>
        <div style =  {{paddingTop: "1em"}}>
            <section><font size="4.6">  
            Hi, my name is Sahil Patel. This is a personal project, 
            where I am developing a f1 website that can obtain data
            from online api (ergast) as well as the game F1 2022. 
            Currently only the graph page is functional. Login 
            functionality will be available shortly.
            
            </font> </section>
        </div>
    </div>
    )
}
export default Home