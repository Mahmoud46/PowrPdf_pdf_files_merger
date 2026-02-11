import base64, os
from nanoid import generate
from config.paths import UPLOAD_DIR, GENERATED_DIR

def save_pdfs(pdfs):
    for file in os.listdir(GENERATED_DIR):
        if file.lower().endswith(".pdf"):
                os.remove(os.path.join(GENERATED_DIR, file))

    paths = []
    for pdf in pdfs:
        pdf_file = base64.b64decode(pdf.split(',')[1])
        pdf_path = f'{UPLOAD_DIR}/{generate()}.pdf'
        paths.append(pdf_path)
        with open(pdf_path, 'wb') as f:
            f.write(pdf_file)
    return paths