import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getDepartments } from "../../api";

const Department = () => {
    const { dname } = useParams();
    const { isLoading, isError, data, error } = useQuery(
        "departments",
        getDepartments
    );

    if (isLoading) return <h2>Loading</h2>;

    const getDepartmentCourses = data.filter((dep) => dep.name === dname)[0][
        "courses"
    ];

    return (
        <div>
            {getDepartmentCourses.map((course) => (
                <p key={course}>{course}</p>
            ))}
        </div>
    );
};

export default Department;
