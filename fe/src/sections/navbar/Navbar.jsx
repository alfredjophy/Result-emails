import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className={style.navbar}>
            <Link className={style.link} to="/">Dashboard</Link>
            <Link className={style.link} to="/uploadFile">Upload File</Link>
            <button className={style.logout}>Logout</button>
        </div>
    );
};

export default Navbar;
