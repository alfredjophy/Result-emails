import { useAuthLogin } from "../../queries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

const Login = (props) => {
    const navigate = useNavigate();
    const submitLoginForm = useAuthLogin({
        onSuccess: (data, variables, context) => {
            if (data.username) {
                props.setLoginStatus(() => true);
                navigate("/dashboard");
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
        <div className={style.formBody}>
            <form onSubmit={handleSubmit} className={style.form}>
                <input name="username" placeholder="USERNAME" />
                <input name="password" type="password" placeholder="PASSWORD" />
                <input type="submit" name="Submit" />
            </form>
        </div>
    );
};

export default Login;
