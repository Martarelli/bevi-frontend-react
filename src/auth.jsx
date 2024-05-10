import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';  

const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');

    if (token) {
        return token;
    } else {
        return null;
    }
}; 

function Auth({ children }) {
    Auth.propTypes = {
        children: PropTypes.array
    };

    if (isAuthenticated()) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default Auth;
