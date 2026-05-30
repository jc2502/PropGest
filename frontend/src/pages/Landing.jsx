import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBuilding, FaShieldAlt, FaChartLine } from "react-icons/fa";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import PublicLayout from "../layouts/PublicLayout";

function Landing() {
    const [featured, setFeatured] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/properties/public?status=available")
            .then(res => setFeatured(res.data.slice(0, 3)))
            .catch(() => {});
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/properties?search=${encodeURIComponent(search)}`);
    };

    return (
        <PublicLayout>
            <section className="hero">
                <div className="hero-content">
                    <h1>Encuentra la propiedad perfecta</h1>
                    <p>Gestiona tus propiedades de forma inteligente con PropGest</p>

                    <form className="hero-search" onSubmit={handleSearch}>
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Buscar por ubicación, tipo o precio..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit">Buscar</button>
                    </form>

                    <div className="hero-cta">
                        <Link to="/register" className="btn-primary-lg">Crear cuenta gratis</Link>
                        <Link to="/properties" className="btn-outline-lg">Ver propiedades</Link>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="section-container">
                    <h2>¿Por qué PropGest?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <FaBuilding />
                            <h3>Gestión simple</h3>
                            <p>Administra todas tus propiedades desde un solo lugar.</p>
                        </div>
                        <div className="feature-card">
                            <FaShieldAlt />
                            <h3>Contratos seguros</h3>
                            <p>Genera y aprueba contratos digitales de forma rápida.</p>
                        </div>
                        <div className="feature-card">
                            <FaChartLine />
                            <h3>Reportes claros</h3>
                            <p>Visualiza ingresos, morosidad y mucho más.</p>
                        </div>
                    </div>
                </div>
            </section>

            {featured.length > 0 && (
                <section className="featured-section">
                    <div className="section-container">
                        <h2>Propiedades destacadas</h2>
                        <div className="properties-grid">
                            {featured.map(p => (
                                <PropertyCard key={p._id} property={p} />
                            ))}
                        </div>
                        <div style={{ textAlign: "center", marginTop: 24 }}>
                            <Link to="/properties" className="btn-primary-lg">Ver todas</Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="cta-section">
                <div className="section-container">
                    <h2>¿Listo para empezar?</h2>
                    <p>Únete a PropGest y lleva el control de tus propiedades.</p>
                    <div className="hero-cta">
                        <Link to="/register" className="btn-primary-lg">Registrarse gratis</Link>
                        <Link to="/login" className="btn-outline-lg">Iniciar sesión</Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default Landing;
