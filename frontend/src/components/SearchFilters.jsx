import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchFilters({ onSearch }) {
    const [filters, setFilters] = useState({
        search: "",
        type: "",
        status: "",
        minPrice: "",
        maxPrice: ""
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = {};
        for (const [k, v] of Object.entries(filters)) {
            if (v !== "") cleaned[k] = v;
        }
        onSearch(cleaned);
    };

    const handleReset = () => {
        setFilters({ search: "", type: "", status: "", minPrice: "", maxPrice: "" });
        onSearch({});
    };

    return (
        <form className="search-filters" onSubmit={handleSubmit}>
            <div className="search-filters-row">
                <div className="search-input-wrap">
                    <FaSearch />
                    <input
                        type="text"
                        name="search"
                        placeholder="Buscar por título, dirección..."
                        value={filters.search}
                        onChange={handleChange}
                    />
                </div>

                <select name="type" value={filters.type} onChange={handleChange}>
                    <option value="">Tipo</option>
                    <option value="house">Casa</option>
                    <option value="apartment">Departamento</option>
                    <option value="office">Oficina</option>
                    <option value="land">Terreno</option>
                </select>

                <select name="status" value={filters.status} onChange={handleChange}>
                    <option value="">Disponibilidad</option>
                    <option value="available">Disponible</option>
                    <option value="occupied">Ocupada</option>
                    <option value="maintenance">Mantenimiento</option>
                </select>

                <input
                    type="number"
                    name="minPrice"
                    placeholder="Precio mín."
                    value={filters.minPrice}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Precio máx."
                    value={filters.maxPrice}
                    onChange={handleChange}
                />

                <button type="submit" className="btn btn-primary">Filtrar</button>
                <button type="button" className="btn" onClick={handleReset}>Limpiar</button>
            </div>
        </form>
    );
}

export default SearchFilters;
