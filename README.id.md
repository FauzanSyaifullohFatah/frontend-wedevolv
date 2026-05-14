# 🚀 Wedevolv - Developer Portfolio Builder

🇮🇩 Indonesia | [🇺🇸 English](README.md)

Wedevolv adalah platform pembuat portfolio developer modern yang dibangun menggunakan React dan Django. Platform ini memungkinkan developer untuk membuat dan mengelola website portfolio profesional dengan mudah untuk menampilkan project, sertifikat, skill, dan informasi pribadi melalui halaman portfolio publik yang bersih dan dapat dikustomisasi.

Setiap user yang sudah terverifikasi dapat memiliki halaman portfolio publik dengan format URL:

```bash
wedevolv.com/username
```

---

# ✨ Fitur

- 👤 Sistem registrasi user
- 🔐 Login & logout authentication
- 🛡️ JWT authentication yang aman
- 📧 Sistem verifikasi email
- 🌐 Pembuatan halaman portfolio publik
- 🔗 URL portfolio custom
- 📁 Menambahkan dan mengelola project
- 🏆 Menambahkan dan mengelola sertifikat
- 🔄 Reset password melalui email
- 📱 Tampilan modern dan responsive
- 🎨 Kustomisasi profile user
- ⚡ Arsitektur REST API
- 🍪 Cookie authentication yang aman

---

# 🔑 Alur Authentication

## 📝 Registrasi
User dapat membuat akun baru menggunakan username, email, dan password.

## 📧 Verifikasi Email
Setelah registrasi, user harus melakukan verifikasi email sebelum halaman portfolio dapat diakses publik.

Contoh:

```bash
wedevolv.com/username
```

## 🔐 Login & Logout
User dapat login dan logout secara aman menggunakan JWT authentication dengan cookie-based session handling.

## 🔄 Reset Password
User dapat melakukan reset password dengan memasukkan email yang terdaftar. Wedevolv akan mengirimkan link reset password ke email user.

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
Source code frontend diupload ke GitHub dan dideploy menggunakan Netlify.

## 🖥️ Backend
Source code backend diupload ke GitHub dan disinkronkan ke VPS untuk production deployment.

---

# 📦 Installation

## 📥 Clone Repository

```bash
git clone https://github.com/yourusername/wedevolv.git
cd wedevolv
```

---

# 💻 Setup Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend berjalan di:

```bash
http://localhost:5173
```

---

# ⚙️ Setup Backend

```bash
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend berjalan di:

```bash
http://localhost:8000
```

---

# 🔑 Environment Variables

Buat file `.env` di dalam folder backend:

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

# 📁 Struktur Project

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

# 🛡️ Fitur Keamanan

- JWT Authentication
- Secure HTTP-only cookies
- CSRF protection
- Email verification
- Sistem reset password
- Secure production configuration

---

# 📝 Catatan

Wedevolv dirancang untuk membantu developer membangun identitas profesional online dengan mudah dan cepat. Platform ini menggabungkan frontend modern menggunakan React dengan backend Django REST yang scalable untuk memberikan pengalaman pembuatan portfolio yang cepat dan aman.