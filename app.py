from flask import Flask, render_template, jsonify, request
from static.services.merge_pdf import merge_pdfs
from static.services.save_pdf import save_pdfs

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('index.html')


@app.route('/request', methods=[ 'POST'])
def get_request():
    try:
        data = request.get_json(force=True)


        if not data or "codes" not in data:
            return jsonify({"error": "Missing 'codes' in request body"}), 400


        saved_files = save_pdfs(data["codes"])
        merged_path = merge_pdfs(saved_files)

        return jsonify({
            "message": "Transformation has been done successfully",
            "path": merged_path
        }), 200

    except Exception as error:
        return jsonify({
            "error": "An error occurred during processing",
            "details": str(error)
        }), 500


if (__name__ == '__main__'):
    app.run()
