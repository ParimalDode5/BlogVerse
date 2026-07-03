import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import {AuthLayout, Login} from './components/index.js'

import AddPost from "./pages/AddPost.jsx"
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'
import SavedPosts from './pages/savedPosts.jsx'
import Profile from './pages/Profile.jsx'

import 'react-loading-skeleton/dist/skeleton.css';
import { Toaster } from "react-hot-toast";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false} >
                    <Login />
                </AuthLayout>
            )
        },
        {
            path:"/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            )
        },
        {
            path:"/all-posts",
            element:(
              <AuthLayout authentication>
                {" "}
                <AllPosts />
              </AuthLayout>
            ),
        },
        {
            path: "/saved-posts",
            element: (
                <AuthLayout authentication>
                    <SavedPosts />
                </AuthLayout>
            )
        },
        {
            path:"/add-post",
            element:(
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            )
        },
        {
            path: "/profile",
            element: (
                <AuthLayout authentication>
                    <Profile />
                </AuthLayout>
            )
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout>
                    {" "}
                    <EditPost />
                </AuthLayout>
            )
        },
        {
            path: "/post/:slug",
            element: <Post />
        },
      ],
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
    </Provider>
  </StrictMode>,
)
