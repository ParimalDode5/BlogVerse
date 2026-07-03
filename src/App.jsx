import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import authService from './Appwrite/auth'
import { login, logout } from './store/authSlice'
import Search from './components/search/Search'

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if(userData) {
          dispatch(login({userData}));
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))
  },[dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        {/* <Search /> */}
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
