import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import Error404 from './pages/error404/Error404'
import Navbar from './components/navbar/Navbar'
import LoginPage from './pages/login/LoginPage'
import ProtectedRoute from './pages/protectedRoute/ProtectedRoute'
import AdminLecturerPage from './pages/admin/lecturer/AdminLecturerPage'
import AdminLessonsPage from './pages/admin/lesson/AdminLessonsPage'
import LecturerLessonsPage from './pages/lecturer/LecturerLessonsPage'

function App() {

  const Layout = ({ children }) => {
    return <div>
      <div className="d-flex m-0">
        <Sidebar />
        <div className='w-100'>
          <Navbar />
          {children}
        </div>
      </div>
    </div>

  }
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute />}>
          <Route exact path="/" element={<Layout children={<HomePage />} />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error404 />} />
        <Route path='/admin/*' element={<ProtectedRoute admin={true} />}>
          <Route path='lecturer' element={<Layout children={<AdminLecturerPage />} />} />
          <Route path='lessons' element={<Layout children={<AdminLessonsPage />} />} />
        </Route>
        <Route path='/lecturer/*' element={<ProtectedRoute lecturer={true} />}>
          <Route path='lessons' element={<Layout children={<LecturerLessonsPage />} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
