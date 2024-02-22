import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import { Context } from "../store/appContext";

export function SecurePage(props) {
    const { store, actions } = React.useContext(Context);
    const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

    React.useEffect(() => {
        if (!store.token) {
            navigate("/login"); // Utiliza navigate para redirigir a "/login"
        }
    }, [store.token, navigate]);

    return <>{props.children}</>;
}
