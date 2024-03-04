import React, { useState } from 'react'
import { FaUser, FaInfoCircle } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Modal } from 'antd'
import "./navbar.css"

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout, user } = useAuth()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <nav className="navbar navbar-expand-lg p-3 border-bottom border-2 main-navbar">
      <div className="container-fluid">
        <Link to="/"><img src='https://upload.wikimedia.org/wikipedia/tr/thumb/c/c6/Samsun_%C3%9Cniversitesi_logo.png/200px-Samsun_%C3%9Cniversitesi_logo.png' style={{ width: "60px" }} /></Link>
        <div className="d-flex ms-auto">
          <Link to="/about" className='text-decoration-none me-2'>
            <button className='btn btn-outline-dark d-flex align-items-center'>
              <FaInfoCircle className='h4 m-0 ' />
              <span className='d-none d-sm-inline-block ms-2'>Hakkında</span>
            </button>
          </Link>
          <button className='btn btn-outline-dark d-flex align-items-center me-2' onClick={showModal}>
            <FaUser className='h4 m-0 ' />
            <span className='d-none d-sm-inline-block ms-2'>Profil</span>
          </button>
          <Link to="/" className='text-decoration-none'>
            <button className='btn btn-outline-dark d-flex align-items-center' onClick={async () => logout()}>
              <HiOutlineLogout className='h4 m-0 ' />
              <span className='d-none d-sm-inline-block ms-2'>Çıkış Yap</span>
            </button>
          </Link>
        </div>
      </div>
      <Modal title="Profil" open={isModalOpen} onCancel={handleCancel} onOk={handleCancel} cancelText="Kapat">
        <div className='h5'>{user.email}</div>
        <div className='h5'>{user.roles}</div>
      </Modal>
    </nav>
  )
}

export default Navbar