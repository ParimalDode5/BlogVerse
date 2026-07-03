# 🚀 BlogVerse

<p align="center">
  <b>A Modern Full Stack Blogging Platform</b>
</p>

<p align="center">
Create, read, edit and share blogs with authentication, bookmarks, likes, comments and rich text editing.
</p>

---

## 🌐 Live Demo

👉 https://blog-verse-lac.vercel.app/

---

## 📸 Screenshots

### 🏠 Home Page

<img src="screenshots/home.png" width="100%">

### 📝 Blog Details

<img src="screenshots/post.png" width="100%">

### 👤 User Profile

<img src="screenshots/profile.png" width="100%">

### 📑 Saved Posts

<img src="screenshots/saved-posts.png" width="100%">

---

# ✨ Features

### Authentication

- User Registration
- User Login
- Secure Logout
- Protected Routes

### Blog Management

- Create Blog
- Edit Blog
- Delete Blog
- Rich Text Editor (TinyMCE)
- Upload Featured Image

### Social Features

- ❤️ Like Posts
- 💬 Comment System
- 🔖 Bookmark Posts
- 📊 Comment Count
- 👍 Like Count

### Search

- Search by Blog Title
- Search by Blog Content

### User Profile

- Profile Overview
- Posts Count
- Likes Received
- Comments Count
- Bookmarks Count
- My Posts Section

### User Experience

- Relative Time Stamps
- Skeleton Loading Screens
- Responsive Layout
- Clean UI
- Image Preview

---

# 🛠 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- TinyMCE

## Backend & Services

- Appwrite Authentication
- Appwrite Database
- Appwrite Storage
- Appwrite SDK

---

# 📂 Project Structure

```text
src
│
├── Appwrite
│   ├── auth.js
│   ├── bookmarkService.js
│   ├── CommentService.js
│   ├── config.js
│   └── likeService.js
│
├── assets
│
├── components
│   ├── bookmark
│   ├── comments
│   ├── container
│   ├── Footer
│   ├── Header
│   ├── like
│   ├── LogoImage
│   ├── post-form
│   ├── profile
│   ├── search
│   ├── skeleton
│   ├── AuthLayout.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Logo.jsx
│   ├── PostCard.jsx
│   ├── PostImage.jsx
│   ├── RTE.jsx
│   ├── Select.jsx
│   └── index.js
│
├── conf
│
├── pages
│   ├── Home.jsx
│   ├── AllPosts.jsx
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   ├── Login.jsx
│   ├── Post.jsx
│   ├── Profile.jsx
│   ├── SavedPosts.jsx
│   └── Signup.jsx
│
├── store
│   ├── authSlice.js
│   ├── likeSlice.js
│   └── store.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/ParimalDode5/BlogVerse.git
```

Move into the project

```bash
cd BlogVerse
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_APPWRITE_URL=

VITE_APPWRITE_PROJECT_ID=

VITE_APPWRITE_DATABASE_ID=

VITE_APPWRITE_COLLECTION_ID=

VITE_APPWRITE_BUCKET_ID=

VITE_APPWRITE_COLLECTION_COMMENT_ID=

VITE_APPWRITE_COLLECTION_LIKE_ID=

VITE_APPWRITE_COLLECTION_BOOKMARK_ID=

VITE_TINYMCE_API_KEY=
```

Run the project

```bash
npm run dev
```

Create Production Build

```bash
npm run build
```

---

# 📚 What I Learned

Through this project I gained hands-on experience with:

- Building scalable React applications
- State management using Redux Toolkit
- Authentication and database integration with Appwrite
- Rich text editor integration using TinyMCE
- Image upload and storage
- Implementing social features (Likes, Comments, Bookmarks)
- Skeleton loading for better UX
- Responsive UI development
- Deploying production-ready applications on Vercel

---

# 🚀 Future Improvements

- Email Verification
- Dark Mode
- Categories & Tags
- Follow Authors
- Notifications
- Share Blogs
- Trending Blogs
- Infinite Scrolling

---

# 👨‍💻 Author

**Parimal Dode**

GitHub

https://github.com/ParimalDode5

LinkedIn

https://www.linkedin.com/in/parimal-dode-3a33b3342/

---

# ⭐ Support

If you liked this project, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is built for learning, portfolio and educational purposes.
