import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function Signup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const { store, actions } = React.useContext(Context);

    React.useEffect(() => {
        if (store.token) {
            navigate("/private");
        }
    }, [store.token, navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="w-50">
                {store.logError && <div className="alert alert-danger">Error</div>}

                <h1 className="mb-4 text-white">Signup</h1>

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
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary me-2" onClick={() => actions.signup(email, password)}>
                        Register
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>Go Back</button>
                </div>
            </div>
        </div>
    );
}
