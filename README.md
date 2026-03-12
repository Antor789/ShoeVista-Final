# ShoeVista - Full-Stack Shoe Store Application

ShoeVista is a modern E-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a fully functional backend API integrated with a dynamic frontend, featuring category-specific product filtering and professional UI components.

## 🚀 Recent Modifications & Fixes

I have successfully implemented the following core features and technical fixes required for the assessment:

### 1. Dynamic Routing & API Integration

- **Backend Optimization:** Consistently implemented a dynamic route (`/api/shoes/:category`) in Express to handle all product categories (Men, Women, Kids) using a single controller function.
- **Frontend Alignment:** Synchronized React components (`Men.jsx`, `Women.jsx`, and `Kids.jsx`) to fetch data from the unified backend endpoints, resolving multiple 404 Route errors.
- **Regex Search:** Enhanced the `getByCategory` controller with case-insensitive Regex support to ensure database matches regardless of text casing in MongoDB Atlas.

### 2. UI/UX Enhancements

- **About Us Implementation:** Developed and integrated the "About Us" section, accessible via the sidebar/navbar as per project requirements.
- **Dynamic Data Rendering:** Connected the `Products.jsx` component to the live MongoDB Atlas database, ensuring real-time data flow for different shoe categories.

### 3. Database Management

- Structured MongoDB Atlas documents to support categorical queries.
- Ensured data integrity between the frontend request parameters and database fields.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **State Management:** React Hooks (useState, useEffect)

## 🔧 Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Antor789/ShoeVista-Final.git](https://github.com/Antor789/ShoeVista-Final.git)
   ```

# Install frontend dependencies

cd client
npm install

# Install backend dependencies

cd ../server
npm install

# Run Backend (from server folder)

npm start / node index.js

# Run Frontend (from client folder)

npm run dev
