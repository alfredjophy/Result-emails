import { Fragment } from "react";
import style from "./Restricted.module.css"

const Restricted = () => {
    return (
        <section className={style.restricted}>
            <h1 className={style.text}>Access Denied</h1>
        </section>
    );
};
export default Restricted;
