from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
import itsdangerous

api = Blueprint('api', __name__)

# Define una clave secreta para firmar los tokens JWT
SECRET_KEY = 'your_secret_key_here'

# Crea un objeto de firma usando la clave secreta
signer = itsdangerous.TimestampSigner(SECRET_KEY)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }
    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def sign_up():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_active = request.json.get("is_active", None)
    
    user = User(email=email, password=password, is_active=is_active)
    db.session.add(user)
    db.session.commit()
    
    return jsonify([]), 200

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Crea un token JWT firmado con la identidad del usuario
    token = signer.sign(user.id)
    return jsonify({ "token": token, "user_id": user.id })

@api.route("/protected", methods=["GET"])
def protected():
    # Obtiene el token del encabezado de autorización
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"msg": "Missing Authorization header"}), 401

    try:
        # Verifica y decodifica el token
        user_id = signer.unsign(token)
        user = User.query.get(user_id)
        return jsonify({"id": user.id, "email": user.email }), 200
    except itsdangerous.BadSignature:
        return jsonify({"msg": "Invalid token"}), 401

if __name__ == '__main__':
    app = Flask(__name__)
    app.register_blueprint(api)
    app.run()
