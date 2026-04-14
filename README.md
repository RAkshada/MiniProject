# 🎬 Movie Search & Favorites System

## 📌 Project Overview

This is a dynamic full-stack web application that allows users to search for movies using a public API and manage their favorite movies. Users can add movies to favorites, rate them, add personal notes, and perform full CRUD operations.

---

## 🚀 Features

* 🔍 Search movies using OMDb API
* ⭐ Add movies to favorites
* 🗑 Remove movies from favorites
* ✏️ Update rating (star-based)
* 📝 Add and edit personal notes
* 💾 Data stored in MySQL database
* 🔄 Dynamic UI updates without page reload
* ⚠️ Duplicate prevention and validation
* ✅ Delete confirmation popup

---

## 🛠 Tech Stack

**Frontend:**

* HTML
* CSS
* JavaScript

**Backend:**

* PHP

**Database:**

* MySQL

**Server:**

* XAMPP

**API:**

* OMDb API

---

## 🔄 How It Works

User → Frontend (JS) → PHP Backend → MySQL Database
↓
OMDb API

* Movies are fetched from API
* Favorites are stored in database
* UI updates dynamically

---

## 🧱 Database Structure

Table: `favorites`

* id (Primary Key)
* title
* year
* poster
* imdbID
* rating
* notes

---

## ⚙️ Setup Instructions

1. Install XAMPP
2. Start Apache and MySQL
3. Move project folder to:

   ```
   E:\Files\htdocs\MiniProject
   ```
4. Open phpMyAdmin and create database:

   ```
   movie_db
   ```
5. Run the SQL table query (provided in project)
6. Open browser:

   ```
   http://localhost/MiniProject
   ```

---

## 📚 Learning Outcomes

* Built a full-stack web application
* Implemented CRUD operations using PHP & MySQL
* Integrated third-party API
* Designed dynamic and responsive UI
* Understood client-server architecture

---

## 🏆 Conclusion

This project demonstrates a complete real-world web application with frontend, backend, database, and API integration, fulfilling all mini project objectives.

---
