import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Private = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Envía una solicitud GET al backend para verificar la autenticación
        const response = await fetch("/api/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt-token")
          }
        });

        if (response.ok) {
          setAuthenticated(true); // Si la respuesta es exitosa, el usuario está autenticado
        } else {
          window.location.href = "/login"; // Si no es exitosa, redirige al usuario a la página de inicio de sesión
        }
      } catch (error) {
        console.error("Error while checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className="text-white p-5">
      {authenticated ? (
        <h2>This is your private dashboard</h2>
      ) : (
        <h2>Redirecting to login...</h2>
      )}
      <Link to="/" className="btn btn-secondary btn-block mt-3">Go back to Home</Link>
    </div>
  );
};

export default Private;
