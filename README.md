# 📚 BookNest - Simple Library Management App

A basic library management application built as a college project.  
This app allows users to add books, view the book list, and automatically manage duplicate entries by updating the book count.

---

## 🚀 Features

- ➕ Add new books
- 📖 View list of all books
- 🔁 Automatically updates count for duplicate books
- 🗂 Simple and clean interface
- ⚡ Lightweight and easy to use

---

## 🛠️ Tech Stack

- Frontend: React ,css
- Backend: Node.js , express
- Database: Local Storage , MongoDB 

---

## 📂 Project Structure
library-management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── bookRoutes.js
│   ├── controllers/
│   │   └── bookController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── uploads/          # images stored here
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddBook.jsx
│   │   │   ├── BookList.jsx
│   │   │   └── BookCard.jsx
│   │   ├── App.js
│   │   ├── api.js
│   │   └── index.js
│   └── package.json
│
└── README.md
