import { Link } from "react-router-dom";

function PublicNavbar() {
    return (
        <nav className="public-navbar">
            <div className="public-navbar-inner">
                <Link to="/" className="public-brand">
                    <span className="public-brand-icon">PG</span>
                    <span>PropGest</span>
                </Link>

                <div className="public-nav-links">
                    <Link to="/properties">Propiedades</Link>
                    <Link to="/login" className="btn-outline">Iniciar sesión</Link>
                    <Link to="/register" className="btn-primary-sm">Registrarse</Link>
                </div>
            </div>
        </nav>
    );
}

export default PublicNavbar;
