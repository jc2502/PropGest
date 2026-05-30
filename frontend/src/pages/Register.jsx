import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("tenant");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
                role
            });

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || "Error al registrarse");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Crear Cuenta</h2>
                <p className="subtitle">Regístrate en PropGest</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre completo</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tipo de cuenta</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="tenant">Inquilino</option>
                            <option value="owner">Propietario</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary">Crear cuenta</button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
