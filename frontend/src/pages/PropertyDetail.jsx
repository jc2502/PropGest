import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaHome, FaUser, FaArrowLeft } from "react-icons/fa";
import api from "../api/axios";
import PublicLayout from "../layouts/PublicLayout";

const typeLabels = { house: "Casa", apartment: "Departamento", office: "Oficina", land: "Terreno" };
const statusLabels = { available: "Disponible", occupied: "Ocupada", maintenance: "Mantenimiento" };

function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get(`/properties/public/${id}`)
            .then(res => setProperty(res.data))
            .catch(() => setError("Propiedad no encontrada"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <PublicLayout>
                <div style={{ padding: 60, textAlign: "center", color: "var(--text-muted)" }}>Cargando...</div>
            </PublicLayout>
        );
    }

    if (error || !property) {
        return (
            <PublicLayout>
                <div style={{ padding: 60, textAlign: "center" }}>
                    <h2>Propiedad no encontrada</h2>
                    <Link to="/properties" className="btn" style={{ marginTop: 16, display: "inline-flex" }}>Volver</Link>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <div className="detail-page">
                <Link to="/properties" className="detail-back"><FaArrowLeft /> Volver a propiedades</Link>

                <div className="detail-grid">
                    <div className="detail-image">
                        <FaHome />
                    </div>

                    <div className="detail-info">
                        <div className="detail-type">{typeLabels[property.type] || property.type}</div>
                        <h1>{property.title}</h1>

                        {property.address && (
                            <p className="detail-address"><FaMapMarkerAlt /> {property.address}</p>
                        )}

                        <div className="detail-price">${property.price?.toLocaleString()}</div>

                        <div className="detail-meta">
                            <div className="detail-meta-item">
                                <span className={`badge ${property.status === "available" ? "green" : property.status === "occupied" ? "blue" : "orange"}`}>
                                    {statusLabels[property.status] || property.status}
                                </span>
                            </div>
                            <div className="detail-meta-item">
                                <FaUser /> {property.owner?.name || "Propietario"}
                            </div>
                        </div>

                        {property.description && (
                            <div className="detail-description">
                                <h3>Descripción</h3>
                                <p>{property.description}</p>
                            </div>
                        )}

                        <div className="detail-restricted">
                            <p>Para solicitar alquiler o guardar favoritos, <Link to="/login">inicia sesión</Link> o <Link to="/register">regístrate</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

export default PropertyDetail;
