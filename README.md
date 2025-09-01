# DevConnect API

**Author:** Raushan Kumar  
**Repository:** `https://github.com/raushan728/devconnect-api.git`

---

## Project Overview

DevConnect API is the complete backend infrastructure for a feature-rich social and communication platform designed specifically for developers. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this API provides a robust, scalable, and secure foundation for a professional developer network.

The platform enables users to create detailed profiles, showcase their work, share posts, and interact with a community of peers through posts, comments, private messaging, and real-time video calls. The entire system is built from the ground up, featuring a secure JWT-based authentication system, comprehensive profile management, and a full-fledged social interaction model.

This backend is fully tested and ready to be integrated with any frontend client.

---

## Core Technologies

*   **Runtime Environment:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB with Mongoose (ODM)
*   **Authentication:** JSON Web Tokens (JWT)
*   **Real-time Communication:** Socket.IO for messaging and WebRTC signaling
*   **File Uploads:** Cloudinary for media storage, handled with Multer
*   **Password Hashing:** bcrypt.js
*   **Validation:** express-validator
*   **External API Integration:** GitHub API for fetching user repositories
*   **Environment Variables:** dotenv

---

## Key Features

This backend supports a wide array of features, making it a comprehensive solution for a developer-centric social platform.

#### 1. Authentication & Security
*   Secure user registration with password hashing (`bcrypt`).
*   Stateless JWT-based login and authentication.
*   Protected routes using custom authentication middleware.
*   "Forgot Password" functionality with secure OTP generation and email delivery via Nodemailer.

#### 2. Advanced Profile Management
*   Create and update detailed developer profiles.
*   Add and delete professional experience and educational background.
*   Integration with the GitHub API to dynamically fetch and display public repositories.
*   Functionality to delete a user's account and associated profile.

#### 3. Social Interaction & Posts
*   Create text-based posts with optional image or video uploads handled by Cloudinary.
*   View a feed of all posts, sorted chronologically.
*   Like and unlike posts.
*   Comment on posts and delete personal comments.
*   Delete personal posts.

#### 4. Communication & Networking
*   Follow and unfollow other users.
*   Block and unblock users to manage interactions.
*   Real-time one-on-one private messaging, powered by Socket.IO.
*   Backend signaling support for peer-to-peer (P2P) video and audio calls using WebRTC.

#### 5. Privacy & Search
*   Users can set their profiles to "Private," restricting access to followers only.
*   Advanced search functionality to find other developers by name or technical skills.

---

## API Endpoints

A summary of the main API routes available. All private routes require a valid JWT in the `x-auth-token` header.

| Method | Endpoint                       | Description                               | Access   |
|--------|--------------------------------|-------------------------------------------|----------|
| `POST` | `/api/users/register`          | Register a new user                       | Public   |
| `POST` | `/api/users/login`             | Authenticate a user and get a token       | Public   |
| `GET`  | `/api/users/auth`              | Get logged-in user data                   | Private  |
| `POST` | `/api/users/forgot-password`   | Send password reset OTP                   | Public   |
| `POST` | `/api/users/reset-password`    | Reset password with OTP                   | Public   |
| `GET`  | `/api/profile/me`              | Get current user's profile                | Private  |
| `POST` | `/api/profile`                 | Create or update a user profile           | Private  |
| `GET`  | `/api/profile`                 | Get all user profiles                     | Public   |
| `GET`  | `/api/profile/user/:id`        | Get a profile by user ID                  | Private  |
| `DELETE`| `/api/profile`                | Delete user, profile, and posts           | Private  |
| `PUT`  | `/api/profile/experience`      | Add work experience to profile            | Private  |
| `DELETE`| `/api/profile/experience/:id` | Delete work experience                    | Private  |
| `GET`  | `/api/profile/github/:user`    | Get GitHub repos for a user               | Public   |
| `GET`  | `/api/posts`                   | Get all posts                             | Private  |
| `POST` | `/api/posts`                   | Create a new post                         | Private  |
| `PUT`  | `/api/posts/like/:id`          | Like or unlike a post                     | Private  |
| `POST` | `/api/posts/comment/:id`       | Add a comment to a post                   | Private  |

*(This is a summarized list. For detailed request/response structures, please refer to the code.)*

---

## Setup & Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/raushan728/devconnect-api.git
    cd devconnect-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    
    # For GitHub API
    GITHUB_TOKEN=your_github_personal_access_token

    # For Nodemailer (Gmail)
    EMAIL_USER=your_gmail_address
    EMAIL_PASS=your_16_digit_gmail_app_password

    # For Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4.  **Run the server:**
    ```bash
    npm run server
    ```
    The server will start on `http://localhost:5000`.

---