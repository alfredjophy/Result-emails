import { useAuthLogin } from "../../queries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import stc from "./stc.jpg";
import bg1 from "./bigone.jpg";

const Login = (props) => {
    const navigate = useNavigate();
    const submitLoginForm = useAuthLogin({
        onSuccess: (data, variables, context) => {
            if (data.username) {
                props.setLoginStatus(() => true);
                navigate("/");
            } else {
                alert("Bad credentials");
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        submitLoginForm.mutate(data);
        e.target.reset();
    };

    if (submitLoginForm.isLoading) return <h1>Loading</h1>;
    return (
        <>
            <div className={style.formBody}>
                <form onSubmit={handleSubmit} className={style.form}>
                    <div className={style.imglogo}>
                        <img src={stc} alt="stc" />
                        <img src={bg1} alt="bigone" />
                        <h5>
                            Welcome to Vite application please sign in through
                            the user name password which have been provided.{" "}
                        </h5>
                    </div>
                    <input name="username" placeholder="USERNAME" />
                    <input
                        name="password"
                        type="password"
                        placeholder="PASSWORD"
                    />
                    <input type="submit" name="Submit" />
                </form>
            </div>
            <div className={style.body}></div>
        </>
    );
};

export default Login;
