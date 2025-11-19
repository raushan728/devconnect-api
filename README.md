# DevConnect

> A modern, full-stack social network platform for developers featuring real-time communication, 3D animations, and comprehensive profile management.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/raushan728/devconnect-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)

**Author:** Raushan Kumar  
**Repository:** `https://github.com/raushan728/devconnect-api.git`

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Architecture](#frontend-architecture)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

DevConnect is a comprehensive full-stack application that combines a powerful Node.js/Express backend with a modern React frontend to create an immersive social network for developers. The platform enables developers to:

- Create and manage detailed professional profiles
- Share posts and engage with the community through likes and comments
- Showcase their work with GitHub integration
- Connect with other developers in real-time
- Experience a visually stunning 3D-enhanced user interface

This repository contains both the backend API (`/`) and the frontend application (`/frontend`), providing a complete, production-ready solution.

---

## Technology Stack

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) with bcrypt password hashing
- **Real-time Features:** Socket.IO for messaging and WebRTC signaling
- **File Storage:** Cloudinary with Multer
- **Validation:** express-validator
- **Email Service:** Nodemailer for password recovery
- **External APIs:** GitHub API integration

### Frontend
- **Framework:** React 18 with Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **3D Graphics:** React Three Fiber (@react-three/fiber, @react-three/drei)
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Icons:** Lucide React
- **UI Effects:** react-parallax-tilt, maath

---

## Features

### Backend API Features

#### Authentication & Security
- Secure user registration and login with JWT authentication
- Password hashing using bcrypt
- Protected routes with custom authentication middleware
- Password recovery system with OTP via email

#### Profile Management
- Create and update developer profiles with rich details
- Professional experience and education tracking
- GitHub repository integration
- Profile search by name and skills
- Private account functionality

#### Social Features
- Create posts with text and media (images/videos)
- Like and comment on posts
- Follow/unfollow users
- Block/unblock functionality
- Real-time private messaging
- Video call support with WebRTC signaling

### Frontend Features

#### User Interface
- Modern, responsive design with dark mode
- Interactive 3D background with particle effects
- Animated components with Framer Motion
- 3D tilt effects on auth forms
- Custom mouse follower animation
- Glassmorphic design elements

#### User Experience
- Real-time form validation and feedback
- Loading states and skeleton screens
- Optimistic UI updates
- Smooth page transitions
- Interactive trending sidebar
- "Who to Follow" recommendations
- Professional footer with links

#### Pages & Routes
- Landing page with 3D hero section
- User authentication (Login/Register)
- Dashboard with post feed
- User profile pages
- Developer directory
- Individual post view with comments
- GitHub repository showcase

---

## Project Structure

```
devconnect-api/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── auth.js               # JWT authentication middleware
├── models/
│   ├── User.js               # User schema
│   ├── Profile.js            # Profile schema
│   └── Post.js               # Post schema
├── routes/
│   ├── api/
│   │   ├── users.js          # User routes
│   │   ├── auth.js           # Auth routes
│   │   ├── profile.js        # Profile routes
│   │   └── posts.js          # Post routes
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/       # Navbar, Footer, Sidebars
│   │   │   ├── UI/           # Reusable UI components
│   │   │   ├── Profile/      # Profile components
│   │   │   ├── Posts/        # Post components
│   │   │   └── Post/         # Single post components
│   │   ├── pages/
│   │   │   ├── Auth/         # Login, Register pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Profiles.jsx
│   │   │   └── Post.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── utils/
│   │   │   └── api.js        # Axios configuration
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server.js                 # Express server entry point
├── package.json
└── .env                      # Environment variables
```

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/raushan728/devconnect-api.git
cd devconnect-api
```

### Step 2: Install Backend Dependencies
```bash
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# GitHub API
GITHUB_TOKEN=your_github_personal_access_token

# Email Service (Gmail)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Running the Application

### Development Mode

#### Start Backend Server
```bash
npm run server
```
The backend API will run on `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173` (or `http://localhost:5174` if 5173 is busy)

### Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Serve Production Build
The built files will be in `frontend/dist` and can be served using any static file server.

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Protected routes require a JWT token in the `x-auth-token` header:
```
x-auth-token: your_jwt_token
```

### Main Endpoints

#### User Routes (`/api/users`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Authenticate user and get token | Public |
| GET | `/auth` | Get logged-in user data | Private |
| POST | `/forgot-password` | Send password reset OTP | Public |
| POST | `/reset-password` | Reset password with OTP | Public |
| PUT | `/:id/follow` | Follow/unfollow a user | Private |
| PUT | `/:id/block` | Block a user | Private |

#### Profile Routes (`/api/profile`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/me` | Get current user's profile | Private |
| POST | `/` | Create or update profile | Private |
| GET | `/` | Get all profiles | Public |
| GET | `/user/:id` | Get profile by user ID | Private |
| DELETE | `/` | Delete account and all data | Private |
| PUT | `/experience` | Add work experience | Private |
| DELETE | `/experience/:id` | Delete work experience | Private |
| PUT | `/education` | Add education | Private |
| DELETE | `/education/:id` | Delete education | Private |
| GET | `/github/:username` | Get GitHub repositories | Public |
| GET | `/search` | Search profiles | Public |

#### Post Routes (`/api/posts`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all posts | Private |
| GET | `/:id` | Get post by ID | Private |
| POST | `/` | Create a post | Private |
| DELETE | `/:id` | Delete a post | Private |
| PUT | `/like/:id` | Like/unlike a post | Private |
| POST | `/comment/:id` | Add comment to post | Private |
| DELETE | `/comment/:id/:comment_id` | Delete a comment | Private |

---

## Frontend Architecture

### Routing Structure
```
/                    - Landing page
/login               - User login
/register            - User registration
/dashboard           - Main feed (protected)
/profiles            - Developer directory (protected)
/profile/:id         - User profile by ID (protected)
/profile             - Current user profile (protected)
/posts/:id           - Single post view (protected)
```

### State Management
- **Authentication:** Global AuthContext using React Context API
- **Local State:** React useState and useEffect hooks
- **API Integration:** Centralized Axios instance with JWT interceptors

### Styling System
- **Tailwind CSS v4** with custom configuration
- **Custom Color Palette:**
  - Primary: Violet (#8b5cf6)
  - Secondary: Fuchsia (#d946ef)
  - Accent: Cyan (#06b6d4)
  - Dark: #0a0118
  - Dark Light: #1a0b2e
- **Custom Animations:** fade-in, slide-up, pulse, spin-slow, float

### 3D Components
- **GlobalBackground3D:** Interactive particle starfield
- **Hero3D:** Animated 3D torus on landing page
- **Sidebar3D:** Floating TorusKnot in dashboard
- **MouseFollower:** Custom cursor animation

---

## Environment Variables

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/devconnect` |
| `JWT_SECRET` | Secret key for JWT signing | `mySecretKey123` |

### Optional Variables
| Variable | Description | Required For |
|----------|-------------|--------------|
| `GITHUB_TOKEN` | GitHub personal access token | GitHub integration |
| `EMAIL_USER` | Gmail address | Password recovery |
| `EMAIL_PASS` | Gmail app password | Password recovery |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Image/video uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Image/video uploads |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Image/video uploads |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow existing code style and formatting
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly before submitting

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For inquiries, collaborations, or support:

- **Email:** raushansinghrajpoot687@gmail.com
- **Twitter:** [@Raushan_090](https://twitter.com/Raushan_090)
- **Linkedin:** [Linkedin](https://www.linkedin.com/in/raushan-kumar-807916390/)

---

**Built with passion by Raushan Kumar**