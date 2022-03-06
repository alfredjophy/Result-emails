import { useParams } from "react-router-dom";
import { useResultQuery, useSendMailQuery } from "../../queries";
import { useState, useEffect } from "react";
import style from "./Result.module.css"

const Results = () => {
    let { rname } = useParams();
    const [sendButton, setButton] = useState(true);

    const results = useResultQuery(rname, {
        onSuccess: (data) => setButton(!data.resultInfo.emailSent),
    });
    const sendEmail = useSendMailQuery({ onSuccess: () => setButton(false) });

    if (results.isLoading || sendEmail.isLoading) return <h3>Loading</h3>;

    return (
        <div className={style.container}>
            {sendButton && (
                <button className={style.send}
                    onClick={() => {
                        sendEmail.mutate(rname);
                        setButton(() => false);
                    }}
                >
                    Send Email
                </button>
            )}
            <table className={style.tab}>
                <thead>
                <tr>
                    <th>SI No</th>
                    <th>Name</th>
                    <th>Email</th>
                    {results.data.resultInfo.subjects.map((s) => (
                        <th>{s}</th>
                    ))}
                    <th>EmailRead</th>
                </tr>
                </thead>

                <tbody>
                {results.data.records.map((e) => (
                    <tr key={e.SI_No}>
                        <td>{e.SI_No}</td>
                        <td>{e.Name}</td>
                        <td>{e.Email}</td>
                        {results.data.resultInfo.subjects.map((s) => (
                            <td>{e[s.replace(" ", "_")]}</td>
                        ))}
                        <td>{e.emailRead ? "Seen" : "Not seen"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Results;
