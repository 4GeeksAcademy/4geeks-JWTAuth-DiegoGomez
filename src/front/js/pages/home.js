import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

const Home = () => {
	return (
	  <div className="text-center mt-5 text-white">
		<h1 className="display-5">Authentication JWT Diego Gomez</h1>
		<div className="d-flex justify-content-center mt-3">
		  <Link to="/signup" className="text-decoration-none">
			<div className="card m-2" style={{ width: "18rem" }}>
			  <div className="card-body">
				<h5 className="card-title">Signup</h5>
			  </div>
			</div>
		  </Link>
		  <Link to="/login" className="text-decoration-none">
			<div className="card m-2" style={{ width: "18rem" }}>
			  <div className="card-body">
				<h5 className="card-title">Login</h5>
			  </div>
			</div>
		  </Link>
		  <Link to="/private" className="text-decoration-none">
			<div className="card m-2" style={{ width: "18rem" }}>
			  <div className="card-body">
				<h5 className="card-title">Private</h5>
			  </div>
			</div>
		  </Link>
		</div>
	  </div>
	);
  };
  
  export default Home;