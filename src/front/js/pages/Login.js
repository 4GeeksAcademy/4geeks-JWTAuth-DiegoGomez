import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const { store, actions } = React.useContext(Context);

    React.useEffect(() => {
        if (store.token) {
            navigate("/private");
        }
    }, [store.token, navigate]);

    const handleLogin = () => {
        actions.login(email, password);
    };

    return (
        <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="p-4">
                {store.logError && <div className="alert alert-danger">{store.logError}</div>}
				<h1 className="mb-4 text-white">Login</h1>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Email</span>
                    <input
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        type="email"
                        className="form-control"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">Password</span>
                    <input
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        type="password"
                        className="form-control"
                        aria-label="Password"
                        aria-describedby="basic-addon2"
                    />
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>Go Back</button>
                </div>
            </div>
        </div>
    );
}
