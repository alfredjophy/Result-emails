import { useState, useEffect, Fragment } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

import Dashboard from "./sections/dashboard/Dashboard";
import Navbar from "./sections/navbar/Navbar";
import Results from "./sections/view_results/Result";
import UploadFile from "./sections/upload_file/UploadFile";
import Department from "./sections/department/Department";
import Login from "./sections/login/Login";
import Restricted from "./sections/restricted/Restricted";

import StudentResult from "./sections/studentResult/StudentResult";

import { useLoginStatus } from "./queries";

const Admin = ({ isLoggedIn }) => {
    return (
        <Fragment>
            <Navbar />
            <Outlet />
        </Fragment>
    );
};
function App() {
    const [isLoggedIn, setLoginStatus] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getloginStatus = useLoginStatus({
        onSuccess: (data) => {
            setLoginStatus(() => data.loginStatus);
            if (data.loginStatus) {
                setUser(() => data);
                navigate("/dashboard");
            }
        },
    });

    if (getloginStatus.isLoading) return <h1>Loading</h1>;

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<Login setLoginStatus={setLoginStatus} />}
                />
                <Route path="/student/result/:id" element={<StudentResult />} />
                <Route element={isLoggedIn ? <Admin /> : <Restricted />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/departments/:dname"
                        element={<Department />}
                    />
                    <Route path="/results/:rname" element={<Results />} />
                    <Route
                        path="/uploadfile"
                        element={
                            user !== null && user.level === 0 ? (
                                <UploadFile />
                            ) : (
                                <Restricted />
                            )
                        }
                    />
                </Route>
                <Route path="*" element={<h1>Missing</h1>} />
            </Routes>
        </>
    );
}

export default App;
