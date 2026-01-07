const url = 'http://localhost:8000';

export const uploadImage = (request, response) => {
    if (!request.file) {
        return response.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${url}/uploads/${request.file.filename}`;
    return response.status(200).json(imageUrl);
};

export const getImage = (request, response) => {
    const filePath = `uploads/${request.params.filename}`;
    response.sendFile(filePath, { root: '.' });
};
