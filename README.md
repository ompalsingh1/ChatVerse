# 💬 ChatVerse

A real-time chat application built with **React, Node.js, Express.js, MongoDB, and Socket.io**.

ChatVerse allows users to register, log in, and communicate with other connected users through real-time messaging.

---

## 🚀 Features

* 🔐 User registration and login
* 💬 Real-time messaging with Socket.io
* 🗄️ MongoDB message storage
* 👤 User-based messaging
* 📜 Persistent message history
* ⚡ Instant message delivery
* 📱 Responsive chat interface
* 🎨 Modern and clean UI
* 🚪 Logout functionality
* 🔒 Environment variables for sensitive configuration

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Socket.io Client
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.io
* dotenv
* CORS

---

## 📂 Project Structure

```text
ChatVerse/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── messageController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── models/
│   │   │   ├── messageModel.js
│   │   │   └── userModel.js
│   │   │
│   │   ├── routes/
│   │   │   ├── messageRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── socket/
│   │   │   └── socketHandler.js
│   │   │
│   │   └── server.js
│   │
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── chat.jsx
│   │   │   └── chat.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Login.css
│   │   │   ├── Register.jsx
│   │   │   ├── Register.css
│   │   │   └── ChatPage.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ompalsingh1/ChatVerse.git
```

Navigate into the project:

```bash
cd ChatVerse
```

---

## 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

Never commit your actual `.env` file to GitHub.

Backend `.env` example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Keep your actual credentials private.

---

## 🔌 Real-Time Messaging

ChatVerse uses **Socket.io** for real-time communication.

The messaging flow works like this:

```text
User types message
       ↓
React Frontend
       ↓
Socket.io Client
       ↓
Node.js + Socket.io Server
       ↓
MongoDB
       ↓
Socket.io broadcasts message
       ↓
Connected users receive message instantly
```

Messages are also stored in MongoDB, allowing previous messages to be loaded when the user opens the chat.

---

## 🗄️ Database

ChatVerse uses **MongoDB** with **Mongoose**.

### User

Stores user information such as:

* Username
* Created timestamp
* Updated timestamp

### Message

Stores:

* Sender
* Message content
* Created timestamp
* Updated timestamp

---

## 🎨 User Interface

ChatVerse contains three primary screens:

### Register

Users can create a ChatVerse account using a username.

### Login

Registered users can log in and access the chat.

### Chat

Users can:

* View previous messages
* Send messages
* Receive messages in real time
* See sender information
* View message timestamps
* Log out

---

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

---

## 🔮 Future Improvements

Possible future features include:

* 👥 Online/offline user status
* ✍️ Typing indicators
* 🟢 Active user list
* 🖼️ Image and file sharing
* 😊 Emoji support
* 🔔 Notifications
* 🗑️ Delete messages
* ✏️ Edit messages
* 👤 User profiles
* 🔍 Message search
* 🌙 Dark mode

---

## 👨‍💻 Author

**Ompal Singh**

B.Tech Computer Science Engineering (AI/DS)

### Connect with me

* GitHub: https://github.com/ompalsingh1
* LinkedIn: https://www.linkedin.com/in/ompal-singh-9b9965368

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is currently intended for learning and demonstration purposes.
