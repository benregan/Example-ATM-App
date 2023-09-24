import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';

function AuthedRoute({ children }) {
    const {user} = useContext(UserContext);

    if (!user.pin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthedRoute;