import os
import uuid

from fastapi import UploadFile

UPLOAD_FOLDER = "static/food"


def save_image(image: UploadFile):
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    extension = image.filename.split(".")[-1]

    filename = f"{uuid.uuid4()}.{extension}"

    filepath = os.path.join(
        UPLOAD_FOLDER,
        filename,
    )

    with open(filepath, "wb") as buffer:
        buffer.write(image.file.read())

    return filepath.replace("\\", "/")