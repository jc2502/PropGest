import { useEffect, useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";
import api from "../../api/axios";
import OwnerLayout from "../../layouts/OwnerLayout";

function OwnerContracts() {
    const [contracts, setContracts] = useState([]);
    const [properties, setProperties] = useState([]);
    const [tenants, setTenants] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ property: "", tenant: "", startDate: "", endDate: "", rentAmount: "" });
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const [cRes, pRes] = await Promise.all([
                api.get("/owner/contracts"),
                api.get("/owner/properties")
            ]);
            setContracts(cRes.data);
            setProperties(pRes.data.filter(p => p.status === "available"));
        } catch {
            setError("Error al cargar datos");
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/owner/contracts", form);
            setShowForm(false);
            setForm({ property: "", tenant: "", startDate: "", endDate: "", rentAmount: "" });
            fetchData();
        } catch (err) {
            setError(err.response?.data?.error || "Error al crear contrato");
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.patch(`/owner/contracts/${id}/approve`);
            fetchData();
        } catch {
            setError("Error al aprobar");
        }
    };

    const statusBadge = (s) => {
        const map = { active: "green", pending: "yellow", expired: "orange", terminated: "red" };
        return <span className={`badge ${map[s] || "slate"}`}>{s}</span>;
    };

    return (
        <OwnerLayout>
            <div className="page-header">
                <h1>Contratos</h1>
                <p>Gestión de contratos de arrendamiento</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="toolbar">
                <button className="btn btn-primary" onClick={() => setShowForm(true)} disabled={properties.length === 0}>
                    <FaPlus /> Generar contrato
                </button>
            </div>

            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Generar contrato</h3>
                            <button className="modal-close" onClick={() => setShowForm(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Propiedad</label>
                                    <select name="property" value={form.property} onChange={handleChange} required>
                                        <option value="">Seleccionar...</option>
                                        {properties.map(p => <option key={p._id} value={p._id}>{p.title} - ${p.price}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>ID del inquilino</label>
                                    <input name="tenant" value={form.tenant} onChange={handleChange} placeholder="ID del usuario inquilino" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Fecha inicio</label>
                                        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha fin</label>
                                        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Monto mensual</label>
                                    <input name="rentAmount" type="number" value={form.rentAmount} onChange={handleChange} placeholder="0" required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-primary">Crear contrato</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Propiedad</th>
                            <th>Inquilino</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Monto</th>
                            <th>Estado</th>
                            <th style={{ textAlign: "right" }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map(c => (
                            <tr key={c._id}>
                                <td><strong>{c.property?.title || "—"}</strong></td>
                                <td>{c.tenant?.name || c.tenant || "—"}</td>
                                <td>{c.startDate ? new Date(c.startDate).toLocaleDateString() : "—"}</td>
                                <td>{c.endDate ? new Date(c.endDate).toLocaleDateString() : "—"}</td>
                                <td>${c.rentAmount}</td>
                                <td>{statusBadge(c.status)}</td>
                                <td style={{ textAlign: "right" }}>
                                    {c.status === "pending" && (
                                        <button className="btn btn-sm btn-success" onClick={() => handleApprove(c._id)}>
                                            <FaCheck /> Aprobar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {contracts.length === 0 && (
                            <tr><td colSpan="7" style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>Sin contratos</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </OwnerLayout>
    );
}

export default OwnerContracts;
