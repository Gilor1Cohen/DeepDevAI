# DeepDevAI

**DeepDevAI** is a FullStack web platform powered by AI, designed to assist developers in every step of the development lifecycle, from understanding documentation to generating code and UI assets.

---

## 🚀 Features

DeepDevAI offers intelligent AI powered tools for:

- 📘 **API & Documentation Explanation**  
  Get clear and contextual explanations for any API or documentation snippet.

- 🧠 **Database Schema Design**  
  Automatically design normalized and scalable relational databases from plain text requirements.

- 💡 **Interview Questions & Practice**  
  Practice with tailored questions and exercises for junior to senior developer interviews.

- 🔍 **Code Review & Suggestions**  
  Receive best-practice reviews and improvements for your code.

- ⚙️ **Code Generation**  
  Generate functions, components, or entire project structures with precision.

- 🎨 **UI Image Generation**  
  Turn design prompts into visual UI concepts using AI image generation.

- ✍️ **Article Generation**  
  Instantly create high-quality technical blog posts and learning material.

- 🧾 **Prompt Optimization**  
  Improve, refactor, and rephrase prompts for better AI output quality.

- 📄 **README File Generator**  
  Instantly generate professional `README.md` files from a project description.

---

## 🧩 Tech Stack

### 📦 Backend – Node.js + Express 5

- Built with **Node.js** and **Express**.
- Uses **CORS** for seamless cross-origin communication.
- **MySQL2** handles database interaction with Promise support.
- Includes **Nodemon** for hot-reloading during development.
- Structured with modular layers: `Controllers`, `Business Logic (BL)`, and `Data Access (DAL)`.

### 💻 Frontend – React

- Built using modern **React** with **Hooks**.
- Structured as a scalable Single Page Application (SPA) using React Router.

### 🗄 Database – MySQL

- Relational database managed by **MySQL**.

### 🤖 AI Engine – OpenAI

- **GPT·4 API** is used for all text-based tools: explanations, code generation, refactoring, and articles.
- **DALL·E API** is used to generate UI visuals and illustrations from descriptive prompts.

---

## ⚙️ Installation & Setup

To run the Deep-Dev-AI project locally:

### 1. Clone the repository:

```bash
git clone https://github.com/Gilor1Cohen/DeepDevAI
cd DeepDevAI
```

### 2. Install dependencies:

```bash

# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Configure environment variables:

```bash

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=DeepDevAI


```

### 4. Start the backend:

```bash

cd server
npm nodemon index

```

### 5. Start the frontend:

```bash

cd ../client
npm run dev


```

```bash


Frontend: http://localhost:5173

Backend: http://localhost:5174

```

---

## 🗄️ Database Configuration

This project uses **MySQL** as the relational database.

Before running the backend server, follow these steps:

1. Make sure your MySQL server is running.
2. Run the SQL script located at `server/schema.sql` to create the database and seed it with initial data.
   You can execute it using any MySQL client (such as MySQL Workbench or the CLI).

3. Create a `.env` file inside the `server/` directory to store your database credentials:

**server/.env**

4. The backend reads this configuration using `dotenv`.
   Make sure your `db.js` includes:

```js
require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = db;
```
