from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import itsdangerous

api = Blueprint('api', __name__)

# Define una clave secreta para firmar los tokens JWT
SECRET_KEY = 'from-diegoGG'

# Crea un objeto de firma usando la clave secreta
signer = itsdangerous.TimestampSigner(SECRET_KEY)

# Maneja la ruta '/hello' para métodos POST y GET
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200

# Maneja la ruta '/signup' para el método POST
@api.route("/signup", methods=["POST"])
def sign_up():
    # Obtiene los datos del cuerpo de la solicitud JSON
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", None)
    
    # Crea un nuevo usuario con los datos proporcionados
    user = User(email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()
    
    return jsonify([]), 200

# Maneja la ruta '/login' para el método POST
@api.route("/login", methods=["POST"])
def create_token():
    # Obtiene los datos del cuerpo de la solicitud JSON
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    # Busca al usuario en la base de datos
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # Si el usuario no existe, devuelve un mensaje de error
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Crea un token JWT firmado con la identidad del usuario
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

# Maneja la ruta '/protected' para el método GET
@api.route("/protected", methods=["GET"])
@jwt_required()  # Protege este endpoint con autenticación JWT
def protected():
    # Obtiene la identidad del usuario autenticado a partir del token JWT
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

# Punto de entrada principal de la aplicación
if __name__ == '__main__':
    app = Flask(__name__)
    app.register_blueprint(api) 
    # Inicia el servidor Flask
    app.run() 
