import {
    useDepartmentsQuery,
    useCoursesQuery,
    useUploadQuery,
} from "../../queries";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Upload.module.css";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const getYears = () => {
    const d = new Date();
    const curYear = d.getFullYear();

    let years = [];
    for (let i = curYear - 2; i < curYear + 3; i++) {
        years.push(i);
    }
    return years;
};

const UploadFile = () => {
    const departments = useDepartmentsQuery();
    const courses = useCoursesQuery();
    const [curDep, setcurDep] = useState(0);
    const [semesters, setSemesters] = useState(null);
    const navigate = useNavigate();
    const uploadFile = useUploadQuery({
        onSuccess: (data, variables, context) => {
            if (data.error) {
                alert(data.error);
                return;
            }
            navigate(`/results/${data.resultName}`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        uploadFile.mutate(data);
        e.target.reset();
    };

    if (departments.isLoading || courses.isLoading) return <h2>Loading</h2>;
    if (departments.isSuccess && courses.isSuccess && semesters === null) {
        const i = courses.data.findIndex(
            (c, i) => c.course == departments.data[curDep].courses[0]
        );
        setSemesters(courses.data[i].semesters);
    }

    return (
        <div className={style.formbox}>
            <br />
            <br />
            <br />

            <form onSubmit={handleSubmit}>
                <div className={style.full}>
                    <div className={style.half}>
                        <label name="department">Department</label>
                        <select
                            name="department"
                            onChange={(e) => {
                                const i = departments.data.findIndex(
                                    (p, i) => p.name == e.target.value
                                );
                                setcurDep(i);
                            }}
                        >
                            {departments.data.map((d) => (
                                <option key={d.name} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.half}>
                        <label name="course">Select Course</label>
                        <select
                            name="course"
                            onChange={(e) => {
                                const i = courses.data.findIndex(
                                    (c, i) => c.course == e.target.value
                                );
                                setSemesters(courses.data[i].semesters);
                            }}
                        >
                            {departments.data[curDep]["courses"].map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={style.full}>
                    <div className={style.half}>
                        <label name="semester">Semester</label>
                        <select name="semester">
                            {Array.from(
                                Array(semesters),
                                (x, index) => index + 1
                            ).map((i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.half}>
                        <label name="exam">Internal Exam</label>
                        <select name="exam">
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                </div>
                <div className={style.full}>
                    <div className={style.half}>
                        <label name="month">Month</label>
                        <select name="month">
                            {months.map((m, i) => (
                                <option key={m} value={i}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.half}>
                        <label name="year">Year</label>
                        <select name="year">
                            {getYears().map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={style.upload}>
                    <label>Upload File</label>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => null}
                        required
                    />
                </div>
                <input type="submit" name="Submit" />
            </form>
        </div>
    );
};

export default UploadFile;
