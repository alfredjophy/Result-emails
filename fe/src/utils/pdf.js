import jsPDF from "jspdf";
import "jspdf-autotable";

// accepts a JSON array and prints as a PDF
const generatePDF = (title, data) => {
    const doc = new jsPDF();
    console.log(data);
    const columns = Object.keys(data[0]);
    const rows = data.map((i) => columns.map((c) => i[c]));
    doc.autoTable(columns, rows, { startY: 20 });
    doc.save("test.pdf");
};

export default generatePDF;
