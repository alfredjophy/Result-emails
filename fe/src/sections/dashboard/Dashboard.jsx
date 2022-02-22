import { useQuery } from "react-query";
import { getDepartments } from "../../api";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { isLoading, isError, data, error } = useQuery(
        "departments",
        getDepartments
    );
    if (isLoading) return <h1>Loading</h1>;
    return (
        <div>
            <h1>Status</h1>
            {data.map((result) => (
                <Link key={result.name} to={`/results/${result.name}`}>
                    <h4>{result.name}</h4>
                </Link>
            ))}
        </div>
    );
};

export default Dashboard;
