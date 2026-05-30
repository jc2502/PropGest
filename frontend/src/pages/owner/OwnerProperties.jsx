import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../api/axios";
import OwnerLayout from "../../layouts/OwnerLayout";

const emptyForm = { title: "", description: "", price: "", address: "", type: "house", status: "available" };

function OwnerProperties() {
    const [properties, setProperties] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");

    const fetchProperties = async () => {
        try {
            const res = await api.get("/owner/properties");
            setProperties(res.data);
        } catch {
            setError("Error al cargar propiedades");
        }
    };

    useEffect(() => { fetchProperties(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const openCreate = () => {
        setForm(emptyForm);
        setEditing(null);
        setShowForm(true);
    };

    const openEdit = (p) => {
        setForm({ title: p.title, description: p.description || "", price: p.price, address: p.address || "", type: p.type, status: p.status });
        setEditing(p._id);
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (editing) {
                await api.put(`/owner/properties/${editing}`, form);
            } else {
                await api.post("/owner/properties", form);
            }
            setShowForm(false);
            fetchProperties();
        } catch (err) {
            setError(err.response?.data?.error || "Error al guardar");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar propiedad?")) return;
        try {
            await api.delete(`/owner/properties/${id}`);
            fetchProperties();
        } catch {
            setError("Error al eliminar");
        }
    };

    const togglePublish = async (id) => {
        try {
            await api.patch(`/owner/properties/${id}/publish`);
            fetchProperties();
        } catch {
            setError("Error al cambiar estado");
        }
    };

    const statusBadge = (s) => {
        const map = { available: "green", occupied: "blue", maintenance: "orange" };
        return <span className={`badge ${map[s] || "slate"}`}>{s}</span>;
    };

    return (
        <OwnerLayout>
            <div className="page-header">
                <h1>Mis Propiedades</h1>
                <p>Administra tus propiedades</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="toolbar">
                <button className="btn btn-primary" onClick={openCreate}><FaPlus /> Nueva propiedad</button>
            </div>

            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editing ? "Editar propiedad" : "Nueva propiedad"}</h3>
                            <button className="modal-close" onClick={() => setShowForm(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Título</label>
                                    <input name="title" value={form.title} onChange={handleChange} required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Precio</label>
                                        <input name="price" type="number" value={form.price} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Tipo</label>
                                        <select name="type" value={form.type} onChange={handleChange}>
                                            <option value="house">Casa</option>
                                            <option value="apartment">Departamento</option>
                                            <option value="office">Oficina</option>
                                            <option value="land">Terreno</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Dirección</label>
                                    <input name="address" value={form.address} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <input name="description" value={form.description} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select name="status" value={form.status} onChange={handleChange}>
                                        <option value="available">Disponible</option>
                                        <option value="occupied">Ocupada</option>
                                        <option value="maintenance">Mantenimiento</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-primary">{editing ? "Guardar" : "Crear"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Precio</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Publicado</th>
                            <th style={{ textAlign: "right" }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(p => (
                            <tr key={p._id}>
                                <td><strong>{p.title}</strong></td>
                                <td>${p.price}</td>
                                <td><span className="badge slate">{p.type}</span></td>
                                <td>{statusBadge(p.status)}</td>
                                <td>{p.published ? <span className="badge green">Sí</span> : <span className="badge red">No</span>}</td>
                                <td style={{ textAlign: "right" }}>
                                    <button className="btn btn-sm" onClick={() => togglePublish(p._id)} title={p.published ? "Despublicar" : "Publicar"}>
                                        {p.published ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <button className="btn btn-sm" onClick={() => openEdit(p)} style={{ marginLeft: 6 }}><FaEdit /></button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)} style={{ marginLeft: 6 }}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                        {properties.length === 0 && (
                            <tr><td colSpan="6" style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>Sin propiedades registradas</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </OwnerLayout>
    );
}

export default OwnerProperties;
