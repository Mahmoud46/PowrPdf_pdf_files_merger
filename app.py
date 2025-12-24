from flask import Flask
from controllers.request_controller import request_bp
from controllers.home_controller import home_bp

app = Flask(__name__)


app.register_blueprint(home_bp)
app.register_blueprint(request_bp)

if (__name__ == '__main__'):
    app.run()
