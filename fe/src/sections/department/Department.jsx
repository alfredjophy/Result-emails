import { useParams } from "react-router-dom";
import {
    useDepartmentsQuery,
    useDepartmentResultsQuery,
    useCoursesQuery,
    useResultStatsQuery,
} from "../../queries";
import { Link } from "react-router-dom";
import style from "./Department.module.css";
import { resultPrettyName } from "../../utils/resultPrettyName";

const StatsBar = ({ total, truths }) => {
    return (
        <div style={{ width: "5rem", height: "2rem", backgroundColor: "red" }}>
            <div
                style={{
                    width: `${(truths / total) * 100}%`,
                    height: "100%",
                    backgroundColor: "green",
                }}
            />
            <div />
        </div>
    );
};

const ResultPreview = (props) => {
    const stats = useResultStatsQuery(props.rname);
    if (stats.isLoading) return <h2>Loading</h2>;

    return (
        <div>
            <Link className={style.link} to={`/results/${props.rname}`}>
                {resultPrettyName(props.rname)}
            </Link>
            {stats.data.emailSent && (
                <StatsBar
                    total={stats.data.totalCount}
                    truths={stats.data.read}
                />
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
            <div className={style.box}>
                {getDepartmentCourses.map((course) => (
                    <div key={course}>
                        <h4 className={style.h4}>{course}</h4>
                        {results.data
                            .filter(
                                (r) =>
                                    r.courseID ==
                                    courses.data.find((c) => c.course == course)
                                        .id
                            )
                            .map((r) => (
                                <ResultPreview key={r.name} rname={r.name} />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Department;
