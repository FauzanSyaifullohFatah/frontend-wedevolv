# 🚀 Wedevolv - Developer Portfolio Builder

🇺🇸 English | [🇮🇩 Indonesia](README.id.md)

Wedevolv is a modern developer portfolio builder platform built using React and Django. The platform allows developers to create and manage professional portfolio websites easily to showcase projects, certificates, skills, and personal information through a clean and customizable public portfolio page.

Each verified user can have a public portfolio page with the following URL format:

```bash
wedevolv.com/username
```

---

# ✨ Features

- 👤 User registration system
- 🔐 Login & logout authentication
- 🛡️ Secure JWT authentication
- 📧 Email verification system
- 🌐 Public portfolio page generation
- 🔗 Custom portfolio URL
- 📁 Add and manage projects
- 🏆 Add and manage certificates
- 🔄 Password reset via email
- 📱 Modern responsive UI
- 🎨 User profile customization
- ⚡ REST API architecture
- 🍪 Secure cookie authentication

---

# 🔑 Authentication Flow

## 📝 Register
Users can create a new account using username, email, and password.

## 📧 Email Verification
After registration, users must verify their email address before their portfolio page becomes publicly accessible.

Example:

```bash
wedevolv.com/username
```

## 🔐 Login & Logout
Users can securely log in and log out using JWT authentication with cookie-based session handling.

## 🔄 Reset Password
Users can reset their password by entering their registered email address. Wedevolv will send a password reset link to the user's email.

---

# 🛠️ Tech Stack

## 🎨 Frontend
- React
- Vite
- React Router DOM
- Axios
- React Helmet Async
- CSS
- ESLint

## ⚙️ Backend
- Django
- Django REST Framework
- Simple JWT
- Django CORS Headers
- Django Cleanup
- SMTP Email Backend

## 🗄️ Database
- SQLite (Development)
- MySQL (Production)

---

# 🚀 Deployment

## 🌐 Frontend
Frontend source code is uploaded to GitHub and deployed using Netlify.

## 🖥️ Backend
Backend source code is uploaded to GitHub and synchronized to a VPS server for production deployment.

---

# 📦 Installation

## 📥 Clone Repository

```bash
git clone https://github.com/yourusername/wedevolv.git
cd wedevolv
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# ⚙️ Backend Setup

```bash
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend runs on:

```bash
http://localhost:8000
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory:

```env
SECRET_KEY=your_secret_key

DEBUG=True

ALLOWED_HOSTS=127.0.0.1,localhost

FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True

EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
```

---

# 📁 Project Structure

```bash
backend/
├── apps/
│   ├── users/
│   ├── projects/
│   └── certificates/
│
├── templates/
│   └── emails/
│
├── media/
├── staticfiles/
└── config/

frontend/
├── src/
├── public/
└── package.json
```

---

# 🛡️ Security Features

- JWT Authentication
- Secure HTTP-only cookies
- CSRF protection
- Email verification
- Password reset system
- Secure production configuration

---

# 📝 Notes

Wedevolv is designed to help developers build a professional online presence quickly and efficiently. The platform combines modern frontend development using React with a scalable Django REST backend architecture to provide a fast and secure portfolio building experience.