import Users from './Users';
import { Link } from "react-router-dom";

const Championship = () => {
    return(
        <section>
            <h1>Championship Page</h1>
            <br />
            <Users />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
        
    )
}
export default Championship