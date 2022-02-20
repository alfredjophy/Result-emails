import { uploadFile } from "../../api";
import { useMutation } from "react-query";

const UploadFile = () => {
    const courses = ["BSc", "MSc", "MCA"];
    const departments = ["Computer Science", "Mathematics", "Physics"];

    const mutate = useMutation((data) => uploadFile(data));
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
        mutate.mutate(data);
    };
    if (mutate.isError) {
        console.log(mutate.error);
    }
    if (mutate.isLoading) return <h3>Uploading...</h3>;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" required />
                <label name="course">Select Course</label>
                <select name="course">
                    {courses.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

                <label name="department">Select Department</label>
                <select name="department">
                    {departments.map((d) => (
                        <option key={d} value={d}>
                            {d}
                        </option>
                    ))}
                </select>
                <label name="semester">Year</label>
                <select name="semester">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <label name="exam_date">Date of the examination</label>
                <input type="date" name="exam_date" required />
                <input type="submit" name="Submit" />
            </form>
        </div>
    );
};

export default UploadFile;
