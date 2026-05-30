import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import PublicLayout from "../layouts/PublicLayout";
import SearchFilters from "../components/SearchFilters";
import PropertyGrid from "../components/PropertyGrid";

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const fetchProperties = async (filters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            for (const [k, v] of Object.entries(filters)) {
                if (v) params.append(k, v);
            }
            const res = await api.get(`/properties/public?${params.toString()}`);
            setProperties(res.data);
        } catch {
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initial = {};
        const search = searchParams.get("search");
        if (search) initial.search = search;
        fetchProperties(initial);
    }, []);

    return (
        <PublicLayout>
            <div className="public-properties-page">
                <div className="page-header">
                    <h1>Propiedades</h1>
                    <p>Explora las propiedades disponibles</p>
                </div>

                <SearchFilters onSearch={fetchProperties} />

                {loading ? (
                    <p style={{ color: "var(--text-muted)", padding: 32, textAlign: "center" }}>Cargando...</p>
                ) : (
                    <PropertyGrid properties={properties} />
                )}
            </div>
        </PublicLayout>
    );
}

export default Properties;
