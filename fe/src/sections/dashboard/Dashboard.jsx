import { Link } from "react-router-dom";

import { useDepartmentsQuery, useDepartmentStatsQuery } from "../../queries";

const DepartmentCard = (props) => {
    const stats = useDepartmentStatsQuery(props.d.name);
    if (stats.isLoading) return <h4>Loading...</h4>;
    return (
        <Link key={props.d.name} to={`/departments/${props.d.name}`}>
            <h4>
                {props.d.name} {stats.data.readStats} %
            </h4>
        </Link>
    );
};
const Dashboard = () => {
    const departments = useDepartmentsQuery();
    if (departments.isLoading) return <h1>Loading</h1>;

    return (
        <div>
            <h1>Status</h1>
            {departments.data.map((d) => (
                <DepartmentCard key={d.dname} d={d} />
            ))}
        </div>
    );
};

export default Dashboard;
