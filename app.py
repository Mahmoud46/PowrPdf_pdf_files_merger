from flask import Flask, render_template
from controllers.request_controller import request_bp

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')

app.register_blueprint(request_bp)

if (__name__ == '__main__'):
    app.run()
