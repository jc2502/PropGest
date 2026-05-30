import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerProperties from "./pages/owner/OwnerProperties";
import OwnerContracts from "./pages/owner/OwnerContracts";
import OwnerTickets from "./pages/owner/OwnerTickets";
import OwnerReports from "./pages/owner/OwnerReports";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />

                <Route
                    path="/tenant/dashboard"
                    element={
                        <ProtectedRoute>
                            <RoleRoute roles={["tenant"]}>
                                <Dashboard />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/owner/dashboard"
                    element={
                        <ProtectedRoute>
                            <RoleRoute roles={["owner"]}>
                                <OwnerDashboard />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/owner/properties"
                    element={
                        <ProtectedRoute>
                            <RoleRoute roles={["owner"]}>
                                <OwnerProperties />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/owner/contracts"
                    element={
                        <ProtectedRoute>
                            <RoleRoute roles={["owner"]}>
                                <OwnerContracts />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/owner/tickets"
                    element={
                        <ProtectedRoute>
                            <RoleRoute roles={["owner"]}>
                                <OwnerTickets />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/owner/reports"
                    element={
                        <ProtectedRoute>
                            <RoleRoute roles={["owner"]}>
                                <OwnerReports />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <RoleRoute roles={["admin"]}>
                                <Dashboard />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;