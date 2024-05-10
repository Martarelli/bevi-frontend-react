import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Auth from "./auth";

function Router() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/dashboard" element={
            <Auth>
                <Dashboard />
            </Auth>
            }/>
        </Routes>
    )
}
export default Router;