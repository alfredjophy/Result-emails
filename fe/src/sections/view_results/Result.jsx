import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { getResult, sendMail } from "../../api";

const Results = () => {
    let { rname } = useParams();
    const { isLoading, isError, data, error } = useQuery(rname, () =>
        getResult(rname)
    );
    const sendEmail = useMutation((rname) => sendMail(rname));

    if (isLoading || sendEmail.isLoading) return <h3>Loading</h3>;

    if (isError) {
        console.log(error);
        return null;
    }
    return (
        <div>
            {!data.resultInfo.emailSent && !sendEmail.isSuccess && (
                <button onClick={() => sendEmail.mutate(rname)}>
                    Send Email
                </button>
            )}
            <div>
                SI_No Name Email {data.resultInfo.subjects.map((s) => s + " ")}
                EmailRead
            </div>
            {console.log(data.records)}
            {data.records.map((e) => (
                <p key={e.SI_No}>
                    {e.SI_No} {e.Name} {e.Email}{" "}
                    {data.resultInfo.subjects.map(
                        (s) => e[s.replace(" ", "_")] + " "
                    )}
                    {e.emailRead ? "Seen" : "Not seen"}
                </p>
            ))}
        </div>
    );
};

export default Results;
