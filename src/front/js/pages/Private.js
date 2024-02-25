import React, { useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export function Private() {
    const { actions } = React.useContext(Context);
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        // Mostrar email del usuario
        const fetchUserInfo = async () => {
            try {
                // Se hace un get al back llamando a la ruta que contiene la información del usuario actual
                const response = await fetch(process.env.BACKEND_URL + "/api/userinfo", {
                    method: "GET",
                    headers: {
                        // Consigo el token del localStorage
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user info");
                }
                const data = await response.json();
                // Lo que guardo dentro de data es lo que recupera la ruta 
                setEmail(data.message);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    return (
        <div className="text-center">
            <h3 className="text-white">This is your private Dashboard</h3>
            {email && (
                <h2 className="text-white">{email}</h2>
            )}
            <div>
                <button className="btn btn-outline-danger mt-3 me-2" onClick={handleLogout}>
                    Logout
                </button>
                <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
                    Go Back
                </button>
            </div>
        </div>
    );
}
