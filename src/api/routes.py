from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

# Crear un blueprint llamado 'api'
api = Blueprint('api', __name__)
CORS(api)
# Endpoint para manejar la solicitud GET en '/hello'
@api.route('/hello', methods=['GET'])
def handle_hello():
    # Crear el cuerpo de la respuesta
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    # Devolver la respuesta como JSON con un código de estado 200 (OK)
    return jsonify(response_body), 200

# Endpoint para manejar la solicitud POST en '/register'
@api.route('/register', methods=['POST'])
def register():
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    print(data)
    # Crear un nuevo usuario con los datos proporcionados
    user = User(email=data["email"], password=data["password"], is_active=True)  # Eliminar el uso de ph.hash
    # Agregar el usuario a la base de datos
    db.session.add(user)
    # Confirmar los cambios en la base de datos
    db.session.commit()
    # Crear el cuerpo de la respuesta
    response_body = {
        "message": "User Created"
    }
    # Devolver una respuesta vacía con un código de estado 204 (No data)
    return jsonify(response_body), 204

# Endpoint para manejar la solicitud POST en '/login'
@api.route('/login', methods=['POST'])
def login():
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    # Buscar al usuario en la base de datos por su dirección de correo electrónico
    user = User.query.filter(User.email == data["email"]).first()
    # Verificar si el usuario no existe
    if user is None:
        # Devolver un mensaje de error con un código de estado 403 (Forbidden)
        return jsonify({"message": "Invalid user"}), 403
    
    # Verificar la contraseña proporcionada
    if user.password != data["password"]: 
        # Devolver un mensaje de error con un código de estado 403 (Forbidden)
        return jsonify({"message": "Invalid password"}), 403
        
    # Crear un token de acceso para el usuario autenticado
    access_token = create_access_token(identity=user.id, additional_claims={"email": user.email})
    # Devolver el token de acceso y el ID del usuario como JSON
    return jsonify({ "token": access_token, "user_id": user.id })

# Endpoint para manejar la solicitud GET en '/userinfo'
@api.route('/userinfo', methods=['GET'])
# Proteger el endpoint con JWT (el usuario debe estar autenticado para acceder)
@jwt_required()
def userinfo():
    # Obtener el ID del usuario autenticado del token JWT
    userId = get_jwt_identity()
    # Buscar al usuario en la base de datos por su ID
    user = User.query.filter(User.id == userId).first()
    # Crear el cuerpo de la respuesta con un mensaje de saludo que incluye el correo electrónico del usuario
    response_body = {
        "message": f"Hello {user.email}"
    }
    # Devolver el mensaje de saludo como JSON con un código de estado 200 (OK)
    return jsonify(response_body), 200
