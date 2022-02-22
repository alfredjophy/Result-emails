import { useParams } from "react-router-dom";
import { useResultQuery, useSendMailQuery } from "../../queries";

const Results = () => {
    let { rname } = useParams();
    const results = useResultQuery(rname);
    const sendEmail = useSendMailQuery(rname);

    if (results.isLoading || sendEmail.isLoading) return <h3>Loading</h3>;
    console.log(results.data);
    return (
        <div>
            {!results.data.resultInfo.emailSent && !sendEmail.isSuccess && (
                <button onClick={() => sendEmail.mutate(rname)}>
                    Send Email
                </button>
            )}
            <div>
                SI_No Name Email{" "}
                {results.data.resultInfo.subjects.map((s) => s + " ")}
                EmailRead
            </div>
            {results.data.records.map((e) => (
                <p key={e.SI_No}>
                    {e.SI_No} {e.Name} {e.Email}{" "}
                    {results.data.resultInfo.subjects.map(
                        (s) => e[s.replace(" ", "_")] + " "
                    )}
                    {e.emailRead ? "Seen" : "Not seen"}
                </p>
            ))}
        </div>
    );
};

export default Results;
