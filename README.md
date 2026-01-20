# MERN Blog App

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js). This project allows users to create accounts, write blog posts, comment on posts, and manage content through a modern web interface.

## Features

- **User Authentication**: Secure login and registration using JWT tokens
- **Blog Posts**: Create, read, update, and delete blog posts
- **Comments System**: Users can comment on blog posts
- **Categories**: Organize posts by categories
- **Image Uploads**: Upload and display images in posts
- **Responsive Design**: Mobile-friendly interface
- **Rich Text Editor**: Create formatted blog content

## Tech Stack

- **Frontend**: React.js with Material-UI components
- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **File Upload**: Multer for handling image uploads
- **Deployment**: Vercel (configured with vercel.json)

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shubham-kumar-34586/mern-blog-app.git
   cd mern-blog-app
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```

   For MongoDB Atlas, get your connection string from the Atlas dashboard.

## Running Locally

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:8000`

2. **Start the frontend client:**
   ```bash
   cd client
   npm start
   ```
   The client will run on `http://localhost:3000`

3. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints

The backend provides the following main API endpoints:

- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `GET /api/posts` - Get all posts
- `POST /api/create` - Create a new post
- `PUT /api/update/:id` - Update a post
- `DELETE /api/delete/:id` - Delete a post
- `POST /api/comment/new` - Add a comment
- `GET /api/comments/:id` - Get comments for a post
- `POST /api/file/upload` - Upload an image

## Deployment

### Backend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy the server:**
   ```bash
   cd server
   vercel --prod
   ```

3. **Set environment variables in Vercel:**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add the environment variables (MONGO_URI, JWT_SECRET, PORT)

### Frontend Deployment (Vercel/Netlify)

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

   Or deploy to Netlify by uploading the `build` folder.

### Database Setup

- Use MongoDB Atlas for cloud database
- Create a cluster and get the connection string
- Update the `MONGO_URI` in your environment variables

## Project Structure

```
mern-blog-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── constants/      # App constants
│   │   ├── context/        # React context
│   │   └── service/        # API service
│   └── package.json
├── server/                 # Node.js backend
│   ├── controller/         # Route controllers
│   ├── database/           # Database connection
│   ├── model/              # MongoDB models
│   ├── routes/             # API routes
│   ├── uploads/            # File uploads
│   ├── utils/              # Utility functions
│   ├── index.js            # Server entry point
│   ├── package.json
│   └── vercel.json         # Vercel configuration
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for React components
- MongoDB for database
- Express.js for backend framework
- React for frontend framework