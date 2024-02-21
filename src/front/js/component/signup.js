import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Evita que el formulario se envíe automáticamente al presionar Enter
    e.preventDefault(); 

    if (password !== confirmPass) {
      // Muestra una alerta si las contraseñas no coinciden
      alert("Las contraseñas no coinciden"); 
      return;
    }

    try {
      // Envía una solicitud POST al backend para registrarse
      const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Incluye el token JWT en los headers de la solicitud
          'Authorization': 'Bearer ' + localStorage.getItem('jwt-token') 
        },
        // Cuerpo de la solicitud con el correo electrónico y la contraseña
        body: JSON.stringify({ email, password }), 
      });

      if (response.ok) {
        // Si la respuesta es correcta (código de estado 200), redirige al usuario a la página de inicio de sesión
        navigate("/login");
      } else {
        // Extrae los datos de la respuesta para obtener el mensaje de error
        const data = await response.json(); 
        console.error("Signup failed:", data.message);
      }
    } catch (error) {
      // Manejo de errores en caso de problemas durante el registro
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="text-dark text-center mb-4">Signup</h2>
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
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    // Actualiza el estado de la confirmación de contraseña al cambiar el valor del campo
                    onChange={(e) => setConfirmPass(e.target.value)} 
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Signup</button>
              </form>
              <Link to="/" className="btn btn-secondary btn-block mt-3">Go back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
