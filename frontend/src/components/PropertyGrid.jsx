import PropertyCard from "./PropertyCard";

function PropertyGrid({ properties }) {
    if (!properties || properties.length === 0) {
        return (
            <div className="empty-state">
                <p>No se encontraron propiedades.</p>
            </div>
        );
    }

    return (
        <div className="properties-grid">
            {properties.map(p => (
                <PropertyCard key={p._id} property={p} />
            ))}
        </div>
    );
}

export default PropertyGrid;
