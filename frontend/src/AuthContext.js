import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if the user is logged in on initial load
    useEffect(() => {
        fetch('http://127.0.0.1:8000/check-auth/', {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => setIsLoggedIn(data.isAuthenticated))
            .catch(() => setIsLoggedIn(false));
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};