import { useQuery } from "react-query";
import { getResults } from "../../api";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { isLoading, isError, data, error } = useQuery("results", getResults);
    if (isLoading) return <h1>Loading</h1>;
    return (
        <div>
            <h1>Results</h1>
            <h2>Exam Name, Email Sent status</h2>
            {data.map((result) => (
                <Link key={result.name} to={`/results/${result.name}`}>
                    <p>
                        {result.name},{result.emailSent ? "yes" : "no"}
                    </p>
                </Link>
            ))}
        </div>
    );
};

export default Dashboard;
