import PublicNavbar from "../components/layout/PublicNavbar";

function PublicLayout({ children }) {
    return (
        <div className="public-layout">
            <PublicNavbar />
            <main>{children}</main>
        </div>
    );
}

export default PublicLayout;
