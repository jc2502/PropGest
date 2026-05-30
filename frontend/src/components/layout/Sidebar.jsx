import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
    FaHome,
    FaBuilding,
    FaUsers,
    FaChartBar
} from "react-icons/fa";

function Sidebar() {
    const { user } = useContext(AuthContext);
    const dashboardPath = `/${user?.role}/dashboard`;

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span>PG</span>
                <span>PropGest</span>
            </div>

            <nav className="sidebar-nav">
                <Link to={dashboardPath}>
                    <FaHome /> <span>Dashboard</span>
                </Link>

                <Link to="/properties">
                    <FaBuilding /> <span>Propiedades</span>
                </Link>

                <Link to="/users">
                    <FaUsers /> <span>Usuarios</span>
                </Link>

                <Link to="/reports">
                    <FaChartBar /> <span>Reportes</span>
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;