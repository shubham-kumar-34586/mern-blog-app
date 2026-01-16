export const uploadImage = (request, response) => {
  if (!request.file) {
    return response.status(400).json({ message: "No file uploaded" });
  }

  const baseUrl = process.env.BASE_URL;
  const imageUrl = `${baseUrl}/uploads/${request.file.filename}`;

  return response.status(200).json(imageUrl);
};

export const getImage = (request, response) => {
  response.sendFile(`uploads/${request.params.filename}`, { root: '.' });
};
