import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

function Router() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/dashboard" element={<Home />}/>
        </Routes>
    )
}
export default Router;