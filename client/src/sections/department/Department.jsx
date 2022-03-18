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
        <div className={style.percentholder}>
            <div
                className={style.percent}
                style={{
                    width: `${(truths / total) * 100}%`,
                }}
            />
            <div />
        </div>
    );
};

const ResultPreview = (props) => {
    const stats = useResultStatsQuery(props.rname);
    if (stats.isLoading) return <h2>Loading</h2>;

    const prettyName = resultPrettyName(props.rname);
    const loc = prettyName.search(/\(/) || prettyName.search("Semester");
    const name = resultPrettyName(props.rname)
        .substring(loc)
        .replace(/\(|\)/g, ""); // remove parentheses

    return (
        <div className={style.res}>
            <Link className={style.link} to={`/results/${props.rname}`}>
                {name}
            </Link>
            {stats.data.emailSent && (
                <StatsBar
                    total={stats.data.totalCount}
                    truths={stats.data.read}
                />
            )}
            <p className={style.h6}>
                {(stats.data.read / stats.data.totalCount).toPrecision(2) * 100}
                %
            </p>
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

    return (
        <div className={style.container}>
            <div className={style.box}>
                <h2 style={{ color: "white" }}>Department of {dname}</h2>
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
