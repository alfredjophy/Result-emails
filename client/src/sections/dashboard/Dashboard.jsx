import { Link } from "react-router-dom";
import style from "./Dashboard.module.css";
import generatePDF from "../../utils/pdf";
import {
    getDepartmentDetails,
    useDepartmentsQuery,
    useDepartmentStatsQuery,
} from "../../queries";
import { AiOutlinePrinter } from "react-icons/ai";

const DepartmentCard = (props) => {
    const stats = useDepartmentStatsQuery(props.d.name);
    if (stats.isLoading) return <h4>Loading...</h4>;
    return (
        <Link className={style.link} to={`/departments/${props.d.name}`}>
            <div className={style.card}>
                <h4 className={style.sub}>{props.d.name}</h4>

                {(stats.data.readStats && (
                    <h4 className={style.percent}>
                        {stats.data.readStats.toFixed(2)} %
                    </h4>
                )) ||
                    null}
            </div>
        </Link>
    );
};
const Dashboard = () => {
    const departments = useDepartmentsQuery();

    const printDash = async () => {
        const details = await getDepartmentDetails();
        const data = details.map((dep) => {
            return {
                Department: dep.name,
                "Email Read": `${dep.stats.toFixed(2)} %`,
            };
        });
        generatePDF("Departments Statistics", data);
    };

    if (departments.isLoading) return <h1>Loading</h1>;

    return (
        <div>
            <h1 className={style.heading}>Status</h1>
            <button className={style.print} onClick={printDash}>
                Print <AiOutlinePrinter />
            </button>
            <section className={style.sec}>
                <div className={style.cards}>
                    {departments.data.map((d) => (
                        <DepartmentCard key={d.name} d={d} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
