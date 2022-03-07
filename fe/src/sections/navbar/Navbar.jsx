import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuthLogout } from "../../queries";
import { useNavigate } from "react-router-dom";
import stc from "./stc.jpg";
import bg1 from "./bigone.jpg";
import { HiOutlineAdjustments,HiOutlineUpload,HiLogout } from 'react-icons/hi';
import {GiHamburgerMenu} from 'react-icons/gi'
const Navbar = () => {
    const navigate = useNavigate();
    const logout = useAuthLogout({ onSuccess: () => navigate("/") });

    return (
        <div className={style.navbar}>
            <div className={style.imglogo}>
                    <img src={stc} alt="stc" />
                    <img src={bg1} alt="bigone" />
            </div>
            <div className={style.links}>
            <Link className={style.link} to="/dashboard">
                Dashboard <HiOutlineAdjustments className={style.ico}/>
            </Link>
            <Link className={style.link} to="/uploadFile">
                Upload File <HiOutlineUpload className={style.ico2}/>
            </Link>
            </div>
            <button className={style.logout} onClick={() => logout.mutate()}>
                Logout <HiLogout className={style.ico2} />
            </button>
        </div>
    );

};

export default Navbar;
