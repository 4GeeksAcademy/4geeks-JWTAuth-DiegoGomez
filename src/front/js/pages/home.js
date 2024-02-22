import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="container text-center">
            <h1 className="display-2 text-warning mb-4">JWT Auth Diego Gomez</h1>
            <div className="row justify-content-center">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Signup</h5>
                            <p className="card-text">Create a new account</p>
                            <Link to="/signup" className="btn btn-primary">Go to Signup</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Login</h5>
                            <p className="card-text">Login to your account</p>
                            <Link to="/login" className="btn btn-primary">Go to Login</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Private</h5>
                            <p className="card-text">Access your private dashboard</p>
                            <Link to="/private" className="btn btn-primary">Go to Dashboard</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
