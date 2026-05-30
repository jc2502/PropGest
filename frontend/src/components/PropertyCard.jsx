import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa";

const typeLabels = {
    house: "Casa",
    apartment: "Departamento",
    office: "Oficina",
    land: "Terreno"
};

const statusLabels = {
    available: "Disponible",
    occupied: "Ocupada",
    maintenance: "Mantenimiento"
};

function PropertyCard({ property }) {
    return (
        <Link to={`/properties/${property._id}`} className="property-card-link">
            <div className="property-card">
                <div className="property-card-img">
                    <FaHome />
                </div>
                <div className="property-card-body">
                    <div className="property-card-type">{typeLabels[property.type] || property.type}</div>
                    <h3>{property.title}</h3>
                    {property.address && (
                        <p className="property-card-address">
                            <FaMapMarkerAlt /> {property.address}
                        </p>
                    )}
                    <div className="property-card-footer">
                        <span className="property-price">${property.price?.toLocaleString()}</span>
                        <span className={`badge ${property.status === "available" ? "green" : property.status === "occupied" ? "blue" : "orange"}`}>
                            {statusLabels[property.status] || property.status}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PropertyCard;
