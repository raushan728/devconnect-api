# DevConnect API

> A feature-rich and secure backend API for a developer-centric social network. Built with Node.js, Express, MongoDB, and Socket.IO.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/raushan728/devconnect-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-blue.svg)](https://socket.io/)

**Author:** Raushan Kumar  
**Repository:** `https://github.com/raushan728/devconnect-api.git`

---

## Table of Contents

- [Project Overview](#project-overview)
- [Core Technologies](#core-technologies)
- [Key Features](#key-features)
- [API Endpoints](#api-endpoints)
- [Setup & Installation](#setup--installation)
- [Contact](#contact)
- [License](#license)

---

## Project Overview

DevConnect API is the complete backend infrastructure for a feature-rich social and communication platform designed specifically for developers. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this API provides a robust, scalable, and secure foundation for a professional developer network.

The platform enables users to create detailed profiles, showcase their work, share posts, and interact with a community of peers through posts, comments, private messaging, and real-time video calls. The entire system is built from the ground up, featuring a secure JWT-based authentication system, comprehensive profile management, and a full-fledged social interaction model.

This backend is fully tested and ready to be integrated with any frontend client.

---

## Core Technologies

-   **Runtime Environment:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB with Mongoose (ODM)
-   **Authentication:** JSON Web Tokens (JWT)
-   **Real-time Communication:** Socket.IO for messaging and WebRTC signaling
-   **File Uploads:** Cloudinary for media storage, handled with Multer
-   **Password Hashing:** bcrypt.js
-   **Validation:** express-validator
-   **External API Integration:** GitHub API for fetching user repositories
-   **Environment Variables:** dotenv

---

## Key Features

This backend supports a wide array of features, making it a comprehensive solution for a developer-centric social platform.

#### 1. Authentication & Security
*   **Secure Registration:** User registration with password hashing (`bcrypt`).
*   **JWT Authentication:** Stateless JWT-based login and authentication for secure access.
*   **Protected Routes:** Custom authentication middleware to protect sensitive endpoints.
*   **Password Recovery:** "Forgot Password" functionality with secure OTP generation and email delivery via Nodemailer.

#### 2. Advanced Profile Management
*   **CRUD Operations:** Create, update, and delete detailed developer profiles.
*   **Professional History:** Add and delete professional experience and educational background.
*   **GitHub Integration:** Dynamically fetch and display public repositories using the GitHub API.
*   **Account Deletion:** Functionality for users to delete their own account and all associated data.

#### 3. Social Interaction & Posts
*   **Rich Media Posts:** Create text-based posts with optional image or video uploads handled by Cloudinary.
*   **Social Feed:** View a feed of all posts, sorted chronologically.
*   **Likes & Comments:** Like/unlike posts, comment on posts, and delete personal comments.
*   **Post Management:** Users can delete their own posts.

#### 4. Communication & Networking
*   **Follow System:** Follow and unfollow other users.
*   **User Blocking:** Block and unblock users to manage interactions.
*   **Real-time Messaging:** One-on-one private messaging, powered by Socket.IO.
*   **Video Call Support:** Backend signaling for peer-to-peer (P2P) video and audio calls using WebRTC.

#### 5. Privacy & Search
*   **Private Accounts:** Users can set their profiles to "Private," restricting access to followers only.
*   **Advanced Search:** Search functionality to find other developers by name or technical skills.

---

## API Endpoints

A summary of the main API routes available. All `Private` routes require a valid JWT in the `x-auth-token` header.

#### User Routes (`/api/users`)
| Method | Endpoint                       | Description                     | Access   |
|--------|--------------------------------|---------------------------------|----------|
| `POST` | `/register`                    | Register a new user             | Public   |
| `POST` | `/login`                       | Authenticate a user & get token | Public   |
| `GET`  | `/auth`                        | Get logged-in user data         | Private  |
| `POST` | `/forgot-password`             | Send password reset OTP         | Public   |
| `POST` | `/reset-password`              | Reset password with OTP         | Public   |
| `PUT`  | `/:id/follow`                  | Follow or unfollow a user       | Private  |
| `PUT`  | `/:id/block`                   | Block a user                    | Private  |

#### Profile Routes (`/api/profile`)
| Method | Endpoint                       | Description                     | Access   |
|--------|--------------------------------|---------------------------------|----------|
| `GET`  | `/me`                          | Get current user's profile      | Private  |
| `POST` | `/`                            | Create or update a profile      | Private  |
| `GET`  | `/`                            | Get all profiles                | Public   |
| `GET`  | `/user/:id`                    | Get a profile by user ID        | Private  |
| `DELETE`| `/`                           | Delete user, profile, & posts   | Private  |
| `PUT`  | `/experience`                  | Add work experience             | Private  |
| `DELETE`| `/experience/:id`             | Delete work experience          | Private  |
| `GET`  | `/github/:user`                | Get GitHub repos for a user     | Public   |
| `GET`  | `/search`                      | Search profiles                 | Public   |

#### Post Routes (`/api/posts`)
| Method | Endpoint                       | Description                     | Access   |
|--------|--------------------------------|---------------------------------|----------|
| `GET`  | `/`                            | Get all posts                   | Private  |
| `GET`  | `/:id`                         | Get a post by ID                | Private  |
| `POST` | `/`                            | Create a new post               | Private  |
| `DELETE`| `/:id`                        | Delete a post                   | Private  |
| `PUT`  | `/like/:id`                    | Like or unlike a post           | Private  |
| `POST` | `/comment/:id`                 | Add a comment to a post         | Private  |
| `DELETE`| `/comment/:id/:comment_id`    | Delete a comment                | Private  |

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

## Contact

For any inquiries or collaborations, feel free to reach out:

-   [Twitter:](https://twitter.com/Raushan_090)
-   [Email:](mailto:raushansinghrajpoot687@gmail.com)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.