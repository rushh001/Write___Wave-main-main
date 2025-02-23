# Writewave Blog Application

Writewave is a comprehensive full-stack blog application designed to empower users with the ability to create, read, update, and delete blogs seamlessly. It features robust user authentication, dynamic blog rendering, and a clean, responsive interface that ensures an intuitive user experience. Built with modern web development tools, Writewave adheres to best practices for performance, security, and usability.

 Features

1. User Authentication
   - Secure login and signup system.
   - Cookies are used for session management.
   - Passwords are encrypted using `Crypto` for enhanced security.

2. Blog Management
   - Create, view, edit, and delete blogs.
   - Upload and display cover images for blogs.
   - Display authors and comments for each blog post.

3. Comment System
   - Users can leave comments on blog posts.
   - Comments are displayed dynamically with author details.

4. Error Handling
   - Comprehensive error handling ensures a smooth user experience.
   - Proper feedback messages for invalid actions (e.g., incorrect login credentials).

5. Middleware
   - Middleware for authentication and other functionalities.

6. JWT Tokens
   - Used for secure user authentication.

7. Database Management
   - MongoDB is used for storing user, blog, and comment data.
   - Password matching logic ensures secure verification.

 Technology Stack

- Frontend: EJS (Embedded JavaScript), Bootstrap 5, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT, Cookies, Crypto
- Others: Multer for file uploads, Middleware for request handling

 How to Clone and Run the Application

# Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed and running.

# Steps

1. Clone the Repository
   ```bash
   git clone https://github.com/vrajj1274/writewave.git
   cd writewave
   ```

2. Install Dependencies
   ```bash
   npm install
   ```

3. Set Up Environment Variables
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/writewave
   JWT_SECRET=your_jwt_secret
   COOKIE_SECRET=your_cookie_secret
   ```

4. Run the Application
   ```bash
   npm start
   ```

5. Access the Application
   Open your browser and go to:
   ```
   http://localhost:8000
   ```

 Folder Structure

```
writewave/
├── models/          # Mongoose models for User, Blog, and Comment
├── routes/          # Route handlers for users and blogs
├── views/           # EJS templates for dynamic rendering
│   ├── partials/    # Reusable components like nav, head, etc.
├── public/          # Static files (CSS, images, etc.)
├── app.js           # Main application file
├── .env             # Environment variables
├── package.json     # Node.js dependencies
```

 Contributing

Contributions are welcome! If you'd like to improve Writewave, follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch and submit a pull request.

 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Enjoy blogging with Writewave! ✍️

