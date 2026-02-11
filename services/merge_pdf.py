import os
from PyPDF2 import PdfMerger
from nanoid import generate
from config.paths import GENERATED_DIR

def merge_pdfs(pdfs):
    pdf_merged_file = PdfMerger()

    for pdf in pdfs:
        pdf_merged_file.append(pdf)

    pdf_merged_path = f'{GENERATED_DIR}/{generate()}.pdf'
    pdf_merged_file.write(pdf_merged_path)
    pdf_merged_file.close()

    for pdf in pdfs:
        os.remove(pdf)

    return pdf_merged_path
