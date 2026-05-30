import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout({ children }) {
    const { user } = useContext(AuthContext);

    return (
        <div className="layout">
            <Sidebar />
            <div className="layout-content">
                <Navbar user={user} />
                <main className="layout-main">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
