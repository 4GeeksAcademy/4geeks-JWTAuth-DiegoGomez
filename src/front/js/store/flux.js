const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			logError: null,
			//Guardar el token en el localStorage
			token: localStorage.getItem("token")
		},
		actions: {
			// Función para obtener un mensaje desde el backend
			getMessage: () => {
				// Hacer una solicitud para obtener un mensaje desde el backend
				fetch(process.env.BACKEND_URL + "/hello")
					.then(resp => {
						if (!resp.ok) {
							throw new Error("Error loading message from backend");
						}
						return resp.json();
					})
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log(error));
			},

			// Función para registrar un usuario
			signup: (email, password) => {
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				.then(resp => {
					if (resp.status === 204) {
						setStore({ logError: null });
					} else if (!resp.ok) {
						throw new Error("register-error");
					} else {
						return resp.json();
					}
				})
				.then(data => {
					if (data && data.token) {
						localStorage.setItem("token", data.token);
						setStore({ token: data.token, logError: null });
					}
				})
				.catch(error => setStore({ logError: error.message, token: null }));
			},			
			

			// Función para iniciar sesión de usuario
			login: (email, password) => {
				fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				.then(resp => {
					if (!resp.ok) {
						throw new Error("authentication-error");
					}
					return resp.json();
				})
				.then(data => {
					// Guardar token en localStorage
					localStorage.setItem("token", data.token);
					setStore({ token: data.token, logError: null });
				})
				.catch(error => setStore({ token: null, logError: error.message }));
			},

			// Función para cerrar sesión
			logout: () => {
				// Eliminar el token al cerrar sesión
				localStorage.removeItem("token");
				setStore({ token: null });
			}
		}
	};
};

export default getState;
