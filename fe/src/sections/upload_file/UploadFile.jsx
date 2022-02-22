import { uploadFile } from "../../api";
import { useMutation, useQuery } from "react-query";
import { getDepartments, getCourses } from "../../api";
import { useState } from "react";

const UploadFile = () => {
    const departments = useQuery("departments", getDepartments);
    const courses = useQuery("courses", getCourses);

    const [curDep, setcurDep] = useState(0);
    const [semesters, setSemesters] = useState(1);

    const mutate = useMutation((data) => uploadFile(data));
    if (mutate.isError) {
        console.log(mutate.error);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        mutate.mutate(data);
    };

    if (departments.isLoading || courses.isLoading) return <h2>Loading</h2>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" required />
                <label name="department">Select Department</label>
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

                <label name="semester">Semester</label>
                <select name="semester">
                    {Array.from(Array(semesters), (x, index) => index + 1).map(
                        (i) => (
                            <option key={i} value={i}>
                                {i}
                            </option>
                        )
                    )}
                </select>
                <label name="exam_date">Date of the examination</label>
                <input type="date" name="exam_date" required />
                <input type="submit" name="Submit" />
            </form>
        </div>
    );
};

export default UploadFile;
