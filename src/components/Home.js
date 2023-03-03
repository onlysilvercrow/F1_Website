import {Link} from 'react-router-dom';
const Home = () => {
    return(
        <section>
            <h1>Home Page</h1>
            <br />

            <Link to="/login">Login</Link>
            <br />

            <Link to="/register">Register</Link>
            <br />

            <Link to="/championship">Championship</Link>
            <br />
        </section>
    )
}
export default Home