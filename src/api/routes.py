from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# No necesitas inicializar nuevamente Flask ni configurar JWTManager aquí
# Flask y JWTManager ya deben estar inicializados en tu aplicación principal

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

@api.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    
    return jsonify(users), 200

@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200
