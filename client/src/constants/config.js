// API_NOTIFICATION_MESSAGES
// This object stores all API related messages in one place

export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded, please wait",
  },

  success: {
    title: "Success",
    message: "Data successfully loaded",
  },

  responseFailure: {
    title: "Error",
    message:
      "An error occurred while fetching response from the server. Please try again",
  },

  requestFailure: {
    title: "Error",
    message: "An error occurred while parsing request data",
  },

  networkError: {
    title: "Error",
    message:
      "Unable to connect with the server. Please check your internet connection and try again later",
  },
};

// API SERVICE URLS
export const SERVICE_URLS = {
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },

  // POSTS
  getAllPosts: { url: "/posts", method: "GET" },
  getPostById: { url: "/post", method: "GET" },
  createPost: { url: "/create", method: "POST" },
  updatePost: { url: "/update", method: "PUT" },
  deletePost: { url: "/delete", method: "DELETE" },

  // FILE
  uploadFile: { url: "/file/upload", method: "POST" },
};
