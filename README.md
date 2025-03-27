# Admin Panel Project Documentation 📋

## Project Overview 🚀
Students will develop an Admin Panel where an admin can manage users and products. The project will include authentication and CRUD operations on user and product data.

## Tech Stack ⚙️
- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Bootstrap (optional)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Passport.js / bcrypt
- **Session Management**: express-session
- **Middleware**: cookie-parser, body-parser

## Project Features 🌟

### 1. User Authentication 🔐
- Admin registration
- Login/logout functionality
- Password hashing using bcrypt

### 2. User Management 👤
- Admin can **add**, **edit**, **delete**, and **view** users.

### 3. Product Management 🛍️
- Admin can **add**, **edit**, **delete**, and **view** products.
- **Product Fields**: Name, Description, Price, Category, Stock Quantity, Image.
- **Search** products by name or category.
- **Listing** products.
- **Upload product images** using Multer.

### 4. Dashboard 📊
- Overview of total products.
- Recent activity log.
- List products with actions (Edit/Delete).

### 5. Profile Management 👤
- Admin can update their own profile (name, email, password).
- Profile picture upload functionality.

### 6. Email Notifications 📧
- Send **welcome emails** to new users.
- **Password reset functionality** with email verification.

---

## Routes 🛤️

| **Method** | **Route**             | **Description**                           |
|------------|-----------------------|-------------------------------------------|
| **GET**    | `/`                   | Home Page                                 |
| **GET**    | `/login`              | Login Page                                |
| **POST**   | `/login`              | Handle Login                              |
| **GET**    | `/logout`             | Logout User                               |
| **GET**    | `/user/dashboard`     | User Dashboard                            |
| **POST**   | `/user/add`           | Add New User                              |
| **POST**   | `/user/edit/:id`      | Edit User                                 |
| **GET**    | `/user/delete/:id`    | Delete User                               |
| **GET**    | `/user/profile`       | View User Profile                         |
| **POST**   | `/user/profile/update`| Update User Profile                       |
| **GET**    | `/products`           | List All Products                         |
| **POST**   | `/product/add`        | Add New Product                           |
| **POST**   | `/product/edit/:id`   | Edit Product                              |
| **GET**    | `/product/delete/:id` | Delete Product                            |

---

## Installation Instructions 🛠️

1. Clone the repository:
   ```bash
   git clone https://github.com/nilesh-paradva/Admin-Panel-Project-node-js.git

2. Install dependencies:
   ```bash
   cd Admin-Panel-Project-node-js
   npm install

3. Run the file:
   ```bash
   npm run dev

