import MainLayout from "../layouts/MainLayout";

import { FaBuilding, FaDollarSign, FaTicketAlt, FaUsers } from "react-icons/fa";

function Dashboard() {
    return (
        <MainLayout>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Resumen general del sistema</p>
            </div>

            <div className="cards-grid">
                <div className="stat-card">
                    <div className="stat-icon blue"><FaBuilding /></div>
                    <div className="stat-info">
                        <h4>0</h4>
                        <p>Total propiedades</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green"><FaDollarSign /></div>
                    <div className="stat-info">
                        <h4>$0</h4>
                        <p>Ingresos mensuales</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange"><FaTicketAlt /></div>
                    <div className="stat-info">
                        <h4>0</h4>
                        <p>Tickets activos</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple"><FaUsers /></div>
                    <div className="stat-info">
                        <h4>0</h4>
                        <p>Usuarios registrados</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard;