import { useQuery } from "react-query";
import { getResults } from "../../api";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { isLoading, isError, data, error } = useQuery("results", getResults);
    if (isLoading) return <h1>Loading</h1>;
    return (
        <div>
            <h1>Results</h1>
            {data.map((result) => (
                <Link key={result.name} to={`/results/${result.name}`}>
                    {result.name},{result.emailSent}
                </Link>
            ))}
        </div>
    );
};

export default Dashboard;
