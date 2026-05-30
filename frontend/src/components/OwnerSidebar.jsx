import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaHome, FaBuilding, FaFileContract, FaChartBar, FaTicketAlt } from "react-icons/fa";

function OwnerSidebar() {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path) ? "active" : "";

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span>PG</span>
                <span>PropGest</span>
            </div>

            <nav className="sidebar-nav">
                <Link to={`/${user?.role}/dashboard`} className={isActive(`/${user?.role}/dashboard`)}>
                    <FaHome /> <span>Dashboard</span>
                </Link>

                <Link to={`/${user?.role}/properties`} className={isActive(`/${user?.role}/properties`)}>
                    <FaBuilding /> <span>Propiedades</span>
                </Link>

                <Link to={`/${user?.role}/contracts`} className={isActive(`/${user?.role}/contracts`)}>
                    <FaFileContract /> <span>Contratos</span>
                </Link>

                <Link to={`/${user?.role}/tickets`} className={isActive(`/${user?.role}/tickets`)}>
                    <FaTicketAlt /> <span>Tickets</span>
                </Link>

                <Link to={`/${user?.role}/reports`} className={isActive(`/${user?.role}/reports`)}>
                    <FaChartBar /> <span>Reportes</span>
                </Link>
            </nav>
        </aside>
    );
}

export default OwnerSidebar;
