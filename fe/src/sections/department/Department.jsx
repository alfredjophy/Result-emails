import { useParams } from "react-router-dom";
import {
    useDepartmentsQuery,
    useDepartmentResultsQuery,
    useCoursesQuery,
    useResultStatsQuery,
} from "../../queries";
import { Link } from "react-router-dom";
import style from "./Department.module.css"

const ResultPreview = (props) => {
    const stats = useResultStatsQuery(props.rname);
    if (stats.isLoading) return <h2>Loading</h2>;

    return (
        <div>
            <Link to={`/results/${props.rname}`}>{props.rname}</Link>
            {stats.data.emailSent && (
                <h4>
                    Read Status :{stats.data.read} of {stats.data.totalCount}
                </h4>
            )}
        </div>
    );
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

    // this will look better once the design is done
    return (
        <div className={style.container}>
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
