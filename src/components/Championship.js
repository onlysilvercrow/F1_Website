import Users from './Users';
import { Link } from "react-router-dom";

const Championship = () => {
    return(
        <section>
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