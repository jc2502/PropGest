import { useEffect, useState } from "react";
import { FaDollarSign, FaExclamationTriangle, FaFileInvoiceDollar } from "react-icons/fa";
import api from "../../api/axios";
import OwnerLayout from "../../layouts/OwnerLayout";

function OwnerReports() {
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/owner/reports/financial")
            .then(res => setReport(res.data))
            .catch(() => setError("Error al cargar reportes"));
    }, []);

    return (
        <OwnerLayout>
            <div className="page-header">
                <h1>Reportes Financieros</h1>
                <p>Historial financiero y morosidad</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="cards-grid">
                <div className="stat-card">
                    <div className="stat-icon green"><FaDollarSign /></div>
                    <div className="stat-info">
                        <h4>${report?.totalIncome ?? 0}</h4>
                        <p>Ingresos totales</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange"><FaFileInvoiceDollar /></div>
                    <div className="stat-info">
                        <h4>{report?.totalContracts ?? 0}</h4>
                        <p>Contratos activos</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon red"><FaExclamationTriangle /></div>
                    <div className="stat-info">
                        <h4>${report?.overdueAmount ?? 0}</h4>
                        <p>Morosidad ({report?.overdueCount ?? 0} pagos)</p>
                    </div>
                </div>
            </div>

            <div className="page-header" style={{ marginTop: 32 }}>
                <h2>Historial financiero</h2>
            </div>

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Método</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report?.recentPayments?.length > 0 ? report.recentPayments.map((p, i) => (
                            <tr key={p._id || i}>
                                <td>${p.amount}</td>
                                <td>{p.date ? new Date(p.date).toLocaleDateString() : "—"}</td>
                                <td><span className="badge slate">{p.method}</span></td>
                                <td>
                                    <span className={`badge ${p.status === "paid" ? "green" : p.status === "overdue" ? "red" : "yellow"}`}>
                                        {p.status}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4" style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>Sin movimientos</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </OwnerLayout>
    );
}

export default OwnerReports;
