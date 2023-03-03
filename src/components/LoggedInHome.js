import {Link} from 'react-router-dom';
const Home = () => {
    return(
        <section>
            <h1>You are logged in!</h1>
            <br />

            <Link to="/championship">Championship</Link>
            <br />
        </section>
    )
}
export default Home