import base64
import os
from random import randint


def save_pdfs(pdfs):
    for pdf in os.listdir('./static/pdfs/merged_pdf'):
        os.remove(f'./static/pdfs/merged_pdf/{pdf}')

    paths = []
    for pdf in pdfs:
        pdf_file = base64.b64decode(pdf.split(',')[1])
        pdf_path = f'./static/pdfs/pdf_list/{randint(0,99999999999999999)}_file.pdf'
        paths.append(pdf_path)
        with open(pdf_path, 'wb') as f:
            f.write(pdf_file)
    return paths