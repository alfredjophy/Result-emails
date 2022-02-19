import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/uploadFile">Upload File</Link>
        </div>
    );
};

export default Navbar;
