import { useEffect, useState } from "react";
import { FaBuilding, FaHome, FaTicketAlt, FaExclamationTriangle } from "react-icons/fa";
import api from "../../api/axios";
import OwnerLayout from "../../layouts/OwnerLayout";

function OwnerDashboard() {
    const [overview, setOverview] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/owner/reports/overview")
            .then(res => setOverview(res.data))
            .catch(() => setError("Error al cargar datos"));
    }, []);

    return (
        <OwnerLayout>
            <div className="page-header">
                <h1>Panel de Propietario</h1>
                <p>Resumen de tus propiedades</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="cards-grid">
                <div className="stat-card">
                    <div className="stat-icon blue"><FaBuilding /></div>
                    <div className="stat-info">
                        <h4>{overview?.total ?? 0}</h4>
                        <p>Total propiedades</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green"><FaHome /></div>
                    <div className="stat-info">
                        <h4>{overview?.occupied ?? 0}</h4>
                        <p>Ocupadas</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange"><FaBuilding /></div>
                    <div className="stat-info">
                        <h4>{overview?.available ?? 0}</h4>
                        <p>Disponibles</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange"><FaTicketAlt /></div>
                    <div className="stat-info">
                        <h4>{overview?.activeTickets ?? 0}</h4>
                        <p>Tickets activos</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon red"><FaExclamationTriangle /></div>
                    <div className="stat-info">
                        <h4>{overview?.totalTickets ?? 0}</h4>
                        <p>Total tickets</p>
                    </div>
                </div>
            </div>
        </OwnerLayout>
    );
}

export default OwnerDashboard;
