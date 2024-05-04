import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";

function Router() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />}/>
        </Routes>
    )
}
export default Router;