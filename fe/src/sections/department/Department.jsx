import { useParams } from "react-router-dom";
import {
    useDepartmentsQuery,
    useDepartmentResultsQuery,
    useCoursesQuery,
} from "../../queries";
import { Link } from "react-router-dom";

const ResultPreview = (props) => {
    return <Link to={`/results/${props.rname}`}>{props.rname}</Link>;
};

const Department = () => {
    const { dname } = useParams();

    const departments = useDepartmentsQuery();
    const results = useDepartmentResultsQuery(dname);
    const courses = useCoursesQuery();

    if (departments.isLoading || results.isLoading || courses.isLoading)
        return <h2>Loading</h2>;

    console.log(results.data);

    const getDepartmentCourses = departments.data.filter(
        (dep) => dep.name === dname
    )[0]["courses"];

    return (
        <div>
            {getDepartmentCourses.map((course) => (
                <div key={course}>
                    <h4>{course}</h4>
                    {results.data
                        .filter(
                            (r) =>
                                r.courseID ==
                                courses.data.find((c) => c.course == course).id
                        )
                        .map((r) => (
                            <ResultPreview key={r.name} rname={r.name} />
                        ))}
                </div>
            ))}
        </div>
    );
};

export default Department;
