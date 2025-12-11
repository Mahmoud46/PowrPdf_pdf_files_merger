import os
from random import randint
from PyPDF2 import PdfMerger

def merge_pdfs(pdfs_path):
    pdf_merged_file = PdfMerger()

    for pdf in pdfs_path:
        pdf_merged_file.append(pdf)

    pdf_merged_path = f'./static/pdfs/merged_pdf/{randint(0,10000000)}_merged_file.pdf'
    pdf_merged_file.write(pdf_merged_path)
    pdf_merged_file.close()

    for pdf in pdfs_path:
        os.remove(pdf)

    return pdf_merged_path
