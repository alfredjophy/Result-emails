import { Link } from "react-router-dom";

import { useDepartmentsQuery } from "../../queries";

const Dashboard = () => {
    const departments = useDepartmentsQuery();
    if (departments.isLoading) return <h1>Loading</h1>;

    return (
        <div>
            <h1>Status</h1>
            {departments.data.map((d) => (
                <Link key={d.name} to={`/departments/${d.name}`}>
                    <h4>{d.name}</h4>
                </Link>
            ))}
        </div>
    );
};

export default Dashboard;
