#  LMS - Learning Management System

A full-stack Learning Management System (LMS) platform built with the **MERN Stack** (MongoDB, Express, React, Node.js). This platform allows instructors to create and manage courses while students can browse, purchase, and track their learning progress.

---

##  Features

###  For Instructors
- Instructor registration and role upgrade (admin approved)
- Create, edit, and delete courses and lectures
- View student enrollment status
- Upload course videos and manage pricing

###  For Students
- Secure registration/login using JWT (cookies-based)
- Browse and preview courses
- Purchase courses securely
- Stream lectures and track progress
- Resume learning from the last watched lecture

###  Admin Dashboard
- Role-based access control
- Instructor request approval system
- Sidebar-based course management
- Responsive and modern UI

---

##  Tech Stack

| Layer          | Technologies                            |
| -------------- | ---------------------------------------- |
| **Frontend**   | React.js, Tailwind CSS, React Router DOM |
| **Backend**    | Node.js, Express.js                      |
| **Database**   | MongoDB (Mongoose)                       |
| **Authentication** | JWT (Cookies-based)                  |
| **File Uploads** | Cloudinary (via Multer)                |
| **State Mgmt** | Redux Toolkit + RTK Query                |
| **Video Player** | React Player                           |

---

##  Project Structure

Lms/
│
├── backend/ # Express backend
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── models/
│ ├── server.js
│ └── .env # Backend environment variables
│
├── frontend/ # React frontend
│ ├── components/
│ ├── pages/
│ ├── features/ # Redux slices and API services
│ ├── App.jsx
│ ├── main.jsx
│ └── .env # Frontend environment variables
│
├── README.md
└── package.json

---




##  Setup Instructions

### 1. Backend Setup

```bash
cd server
npm install
i have already  provide a env sample file 
# Create .env file with the following variables:
# MONGO_URI=
# JWT_SECRET=
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
#
npm run dev 
```

### 2. Frontend Setup
```bash
cd client

npm install

npm run dev 
```


### Notable Dependencies
```
react, react-router-dom, @reduxjs/toolkit

tailwindcss, lucide-react

express, mongoose, multer, cloudinary

react-player, sonner (for toast notifications)
``` 

# Author

# **Sagar Rana**

**Full Stack Developer** | Passionate about building scalable and real-world web applications

[My GitHub](https://github.com/Sagar-Rana42/my-Profile)  
[Connect on LinkedIn](https://www.linkedin.com/in/sagar-rana-999a04256/)  
