from flask import Flask, send_from_directory, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from api.routes import api
from api.utils import APIException, generate_sitemap
from api.models import db
from flask_jwt_extended import JWTManager
from itsdangerous import TimestampSigner
import os

app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de CORS
CORS(app)

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Configuración del JWT
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

# Registrar blueprints y manejar errores
app.register_blueprint(api, url_prefix='/api')

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Directorio de archivos estáticos
static_file_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    return send_from_directory(static_file_dir, path)

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
