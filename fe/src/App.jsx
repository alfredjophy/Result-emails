import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./sections/dashboard/Dashboard";
import Navbar from "./sections/navbar/Navbar";
import Results from "./sections/view_results/Result";
import UploadFile from "./sections/upload_file/UploadFile";
import Department from "./sections/department/Department";
import Login from "./sections/login/Login";
import Restricted from "./sections/restricted/Restricted";

import { useLoginStatus } from "./queries";

function App() {
    const [loginStatus, setLoginStatus] = useState(null);
    const getloginStatus = useLoginStatus();
    if (getloginStatus.isLoading) return <h1>Loading</h1>;

    if (loginStatus === null) setLoginStatus(() => getloginStatus.data);

    return !loginStatus ? (
        <Login />
    ) : (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={loginStatus ? <Dashboard /> : <Restricted />}
                />
                <Route
                    path="/departments/:dname"
                    element={loginStatus ? <Department /> : <Restricted />}
                />
                <Route
                    path="/results/:rname"
                    element={loginStatus ? <Results /> : <Restricted />}
                />
                <Route
                    path="/uploadfile"
                    element={loginStatus ? <UploadFile /> : <Restricted />}
                />
            </Routes>
        </div>
    );
}

export default App;
