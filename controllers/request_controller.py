from flask import jsonify, request, Blueprint
from services.merge_pdf import merge_pdfs
from services.save_pdf import save_pdfs

request_bp = Blueprint("request_bp", __name__)

@request_bp.route("/request", methods=["POST"])
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