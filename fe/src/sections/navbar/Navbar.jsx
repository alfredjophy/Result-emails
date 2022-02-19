import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const views = ["Dashboard", "Results", "UploadFile"];
    return (
        <div>
            <h3>Dashboard</h3>
            <h3>Upload New File</h3>
        </div>
    );
};
