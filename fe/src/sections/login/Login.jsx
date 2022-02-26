import { useAuthLogin } from "../../queries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const submitLoginForm = useAuthLogin({
        onSuccess: (data, variables, context) => {
            if (data.username) {
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
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label name="username">Username</label>
                <input name="username" />
                <br />
                <label name="password">Password</label>
                <input name="password" type="password" />
                <br />
                <input type="submit" name="Submit" />
            </form>
        </div>
    );
};

export default Login;
