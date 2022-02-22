import { useParams } from "react-router-dom";
import { useResultQuery, useSendMailQuery } from "../../queries";
import { useState, useEffect } from "react";

const Results = () => {
    let { rname } = useParams();
    const results = useResultQuery(rname);
    const sendEmail = useSendMailQuery(rname);
    const [sendButton, setButton] = useState(true);
    useEffect(() => {
        while (results.isLoading);
        setButton(!results.data.resultInfo.emailSent);
    }, []);

    if (results.isLoading || sendEmail.isLoading) return <h3>Loading</h3>;

    return (
        <div>
            {sendButton && (
                <button
                    onClick={() => {
                        sendEmail.mutate(rname);
                        setButton(() => false);
                    }}
                >
                    Send Email
                </button>
            )}
            <div>
                SI_No Name Email
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
