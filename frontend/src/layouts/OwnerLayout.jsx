import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import OwnerSidebar from "../components/OwnerSidebar";

function OwnerLayout({ children }) {
    const { user } = useContext(AuthContext);

    return (
        <div className="layout">
            <OwnerSidebar />
            <div className="layout-content">
                <Navbar user={user} />
                <main className="layout-main">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default OwnerLayout;
