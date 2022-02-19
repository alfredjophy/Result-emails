import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getResult } from "../../api";

const Results = () => {
    let { rname } = useParams();
    const { isLoading, isError, data, error } = useQuery(rname, () =>
        getResult(rname)
    );

    if (isLoading) return <h3>Loading</h3>;
    if (isError) {
        console.log(error);
        return null;
    }
    return (
        <div>
            {data.records.map((e) => (
                <p key={e.SI_No}>
                    {e.SI_No} {e.Name} {e.Email}
                </p>
            ))}
        </div>
    );
};

export default Results;
