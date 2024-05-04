import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";

function MainRoutes() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<App />}/>
        </Routes>
    )
}
export default MainRoutes;