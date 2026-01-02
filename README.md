# PowrPdf PDF Merger

**PowrPdf** is a full-stack web application designed to efficiently merge multiple PDF files into a single document. The platform focuses on simplicity, performance, and flexibility, allowing users to manage and combine an unlimited number of PDF files in one operation.

---

## 📌 Overview

PowrPdf provides a streamlined interface for uploading, managing, and merging PDF documents. Users can add, remove, or reorder files before merging, ensuring complete control over the final output.

The application is suitable for everyday document management tasks, offering a lightweight solution without the need for external desktop software.

---

## 🚀 Features

- Merge an unlimited number of PDF files in a single operation
- Insert or remove PDF files before merging
- Preserve original document order and structure
- Simple and intuitive user interface
- Server-side PDF processing for reliability
- Lightweight and efficient implementation

---

## 🛠️ Tech Stack

- **Frontend**

  - HTML
  - CSS
  - JavaScript

- **Backend**
  - Python
  - Flask
  - **PyPDF2** (PDF processing and merging)

---

## 💾 File Handling

- Uploaded PDF files are processed on the server
- The merged PDF is generated dynamically and returned to the user
- No persistent file storage is required after processing

---

## Demo

![Demo](PowrPdf.gif)

---

## 📂 Project Structure

```bash
project-root/
├── controllers/
├── services/
├── static/
|   ├── css/
|   ├── imgs/
|   ├── js/
|   └── pdfs/
|       ├── merged_pdf/ # Generated merged PDFs
|       └── pdf_list/   # Temporarily uploaded PDF files
├── templates/         # HTML templates
├── app.py             # Flask application entry point
└── requirements.txt   # Python dependencies
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9 or higher
- pip (included with Python)

## ⚙️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/Mahmoud46/PowrPdf_pdf_files_merger.git
```

2. Navigate to the project directory

```bash
cd PowrPdf_pdf_files_merger
```

3. Create and activate a virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # On macOS / Linux: source venv/bin/activate
```

4. Install dependencies

```bash
pip install -r requirements.txt
```

5. Run the Flask server

```bash
flask run
```
