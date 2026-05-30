import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ user }) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <h3>Bienvenido, {user?.name}</h3>
            <div className="navbar-right">
                <span className="navbar-role">{user?.role}</span>
                <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
            </div>
        </header>
    );
}

export default Navbar;