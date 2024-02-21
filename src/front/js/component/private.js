import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Private = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Función asincrónica para verificar la autenticación del usuario al cargar el componente
    const checkAuthentication = async () => {
      try {
        // Envía una solicitud GET al backend para verificar la autenticación del usuario
        const response = await fetch("/api/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt-token") // Incluye el token JWT en los headers de la solicitud
          }
        });

        if (response.ok) {
          // Si la respuesta es exitosa, establece el estado de autenticación como verdadero
          setAuthenticated(true);
        } else {
          // Si la respuesta no es exitosa, redirige al usuario a la página de inicio de sesión
          window.location.href = "/login";
        }
      } catch (error) {
        // Manejo de errores en caso de problemas al verificar la autenticación
        console.error("Error while checking authentication:", error);
      }
    };

    // Llama a la función de verificación de autenticación al cargar el componente
    checkAuthentication();
  }, []);

  return (
    <div className="text-white p-5">
      {authenticated ? (
        // Si el usuario está autenticado, muestra un mensaje de bienvenida
        <h2>This is your private dashboard</h2>
      ) : (
        // Si el usuario no está autenticado, muestra un mensaje de redirección a la página de inicio de sesión
        <h2>Redirecting to login...</h2>
      )}
      {/* Enlace para volver a la página de inicio */}
      <Link to="/" className="btn btn-secondary btn-block mt-3">Go back to Home</Link>
    </div>
  );
};

export default Private;
