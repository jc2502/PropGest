import { useEffect, useState } from "react";
import api from "../../api/axios";
import OwnerLayout from "../../layouts/OwnerLayout";

const STATUS_OPTIONS = ["open", "in_progress", "resolved", "closed"];

function OwnerTickets() {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState("");

    const fetchTickets = async () => {
        try {
            const res = await api.get("/owner/tickets");
            setTickets(res.data);
        } catch {
            setError("Error al cargar tickets");
        }
    };

    useEffect(() => { fetchTickets(); }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await api.patch(`/owner/tickets/${id}/status`, { status });
            fetchTickets();
        } catch {
            setError("Error al actualizar estado");
        }
    };

    const priorityBadge = (p) => {
        const map = { high: "red", medium: "orange", low: "blue" };
        return <span className={`badge ${map[p] || "slate"}`}>{p}</span>;
    };

    const statusBadge = (s) => {
        const map = { open: "blue", in_progress: "yellow", resolved: "green", closed: "slate" };
        return <span className={`badge ${map[s] || "slate"}`}>{s.replace("_", " ")}</span>;
    };

    return (
        <OwnerLayout>
            <div className="page-header">
                <h1>Tickets</h1>
                <p>Gestión de incidencias</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Propiedad</th>
                            <th>Prioridad</th>
                            <th>Estado</th>
                            <th>Creado</th>
                            <th style={{ textAlign: "right" }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(t => (
                            <tr key={t._id}>
                                <td><strong>{t.title}</strong></td>
                                <td>{t.property?.title || "—"}</td>
                                <td>{priorityBadge(t.priority)}</td>
                                <td>{statusBadge(t.status)}</td>
                                <td>{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—"}</td>
                                <td style={{ textAlign: "right" }}>
                                    <select
                                        value={t.status}
                                        onChange={(e) => handleStatusChange(t._id, e.target.value)}
                                        style={{ padding: "6px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", fontSize: "0.8rem" }}
                                    >
                                        {STATUS_OPTIONS.map(s => (
                                            <option key={s} value={s}>{s.replace("_", " ")}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {tickets.length === 0 && (
                            <tr><td colSpan="6" style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>Sin tickets</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </OwnerLayout>
    );
}

export default OwnerTickets;
