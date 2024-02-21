import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    // Evita que el formulario se envíe automáticamente al presionar Enter
    e.preventDefault(); 

    try {
      // Envía una solicitud POST al backend para iniciar sesión
      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Cuerpo de la solicitud con el correo electrónico y la contraseña
        body: JSON.stringify({ email, password }), 
      });

      if (response.ok) {
        // Extrae los datos de la respuesta
        const data = await response.json(); 
        // Almacena el token JWT en el almacenamiento local del navegador
        localStorage.setItem("jwt-token", data.token); 
        navigate("/private"); 
      } else {
        // Si la respuesta no es exitosa, muestra un mensaje de error en la consola
        const data = await response.json(); 
        console.error("Login failed:", data.message); 
      }
    } catch (error) {
      // Muestra el error en la consola del navegador
      console.error("Error during login:", error); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="text-dark text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    // Actualiza el estado del correo electrónico al cambiar el valor del campo
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    // Actualiza el estado de la contraseña al cambiar el valor del campo
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button> {/* Botón para enviar el formulario de inicio de sesión */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
