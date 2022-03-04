import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuthLogout } from "../../queries";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const logout = useAuthLogout({ onSuccess: () => navigate("/") });

    return (
        <div className={style.navbar}>
            <Link className={style.link} to="/dashboard">
                Dashboard
            </Link>
            <Link className={style.link} to="/uploadFile">
                Upload File
            </Link>
            <button className={style.logout} onClick={() => logout.mutate()}>
                Logout
            </button>
        </div>
    );
};

export default Navbar;
