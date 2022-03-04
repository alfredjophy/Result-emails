import { useParams } from "react-router-dom";
import { useStudentResult } from "../../queries";
import { Fragment } from "react";
const StudentResult = () => {
    const { id } = useParams();
    const result = useStudentResult(id);
    if (result.isLoading) return <h1>Loading...</h1>;
    const subjects = Object.keys(result.data).filter(
        (key) =>
            key != "Name" &&
            key != "Email" &&
            key != "emailRead" &&
            key != "SI_No"
    );
    console.log(subjects);
    return (
        <Fragment>
            <h1>
                {result.data.Name} {result.data.SI_No}
            </h1>
            <table>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                </tr>
                {subjects.map((subject) => (
                    <tr>
                        <td>{subject.replace("_", " ")}</td>
                        <td>{result.data[subject]} %</td>
                    </tr>
                ))}
            </table>
        </Fragment>
    );
};

export default StudentResult;
