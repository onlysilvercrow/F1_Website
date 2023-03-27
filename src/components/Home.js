import useAuth from "../hooks/useAuth";
const Home = () => {
    const auth = useAuth()
    return(
    <main className='section-home'>
        {/* {console.log({auth})} */}
    </main>
    )
}
export default Home