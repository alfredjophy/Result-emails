import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./sections/dashboard/Dashboard";
import Navbar from "./sections/navbar/Navbar";
import Results from "./sections/view_results/Result";
import UploadFile from "./sections/upload_file/UploadFile";

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/results/:rname" element={<Results />} />
                <Route path="/uploadfile" element={<UploadFile />} />
            </Routes>
        </div>
    );
}

export default App;
