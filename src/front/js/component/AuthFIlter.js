import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function AuthFIlter(props) {
    const { store, actions } = React.useContext(Context);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!store.token) {
            navigate("/login");
        }
    }, [store.token, navigate]);

    return <>{props.children}</>;
}
