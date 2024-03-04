import React, { useState } from 'react'
import {
    Sidebar as Sidenav, Menu, MenuItem, SubMenu
} from 'react-pro-sidebar';
import './sidebar.css'
import { BiArrowBack } from 'react-icons/bi';
import { FaListAlt } from 'react-icons/fa';
import { IoMdArrowForward, IoMdSchool } from 'react-icons/io';
import { AiFillHome, AiOutlineArrowUp } from 'react-icons/ai';
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom';


function Sidebar() {
    const { user } = useAuth()
    const processAdminActive = ["/admin/lecturer","/admin/lessons","/lecturer/lessons"]
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const [collapsed, setCollapsed] = useState(isMobile)
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <Sidenav
            className='p-0 sidebar '
            collapsed={collapsed}
        >
            {
                !collapsed && <Link to='/'><img src='https://upload.wikimedia.org/wikipedia/tr/thumb/c/c6/Samsun_%C3%9Cniversitesi_logo.png/200px-Samsun_%C3%9Cniversitesi_logo.png' className='sidebar-img' /></Link>
            }
            <Menu >
                {collapsed ? (
                    <MenuItem
                        icon={<IoMdSchool className='sidebar-icon' />}
                        onClick={handleCollapse}
                        className='d-none d-sm-block'
                    ></MenuItem>
                ) : (
                    <MenuItem
                        onClick={handleCollapse}
                    >
                        <div
                            style={{
                                padding: '9px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 15,
                                letterSpacing: '1px'
                            }}
                        >
                            MUDEK
                        </div>
                    </MenuItem>
                )}
            </Menu>
            <Menu>
                <MenuItem
                    icon={<AiFillHome className='sidebar-icon' />}
                    active={window.location.pathname === "/"}
                    component={<Link to="/" />}
                >
                    Ana Sayfa
                </MenuItem>
                <SubMenu
                    defaultOpen={processAdminActive.includes(window.location.pathname)}
                    label="İşlemler"
                    title={'İşlemler'}
                    icon={<FaListAlt className='sidebar-icon' />}
                    active = {processAdminActive.includes(window.location.pathname)}
                >
                    {
                        user.roles.includes("Admin") &&
                        <MenuItem
                            active={window.location.pathname === "/admin/lecturer"}
                            component={<Link to="/admin/lecturer" />}
                        >
                            Öğretim Üyeleri
                        </MenuItem>
                    }
                    {
                        user.roles.includes("Admin") &&
                        <MenuItem
                            active={window.location.pathname === "/admin/lessons"}
                            component={<Link to="/admin/lessons" />}
                        >
                            Dersler
                        </MenuItem>
                    }
                    {
                        user.roles.includes("User") &&
                        <MenuItem
                            active={window.location.pathname === "/lecturer/lessons"}
                            component={<Link to="/lecturer/lessons" />}
                        >
                            Dersler
                        </MenuItem>
                    }
                </SubMenu>
            </Menu>
            {
                collapsed ? <IoMdArrowForward className='back-button d-none d-sm-block' onClick={handleCollapse} /> : <BiArrowBack className='back-button ' onClick={handleCollapse} />
            }
            {
                isMobile && <AiOutlineArrowUp onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='top-button'>Test</AiOutlineArrowUp>
            }
        </Sidenav>
    )
}

export default Sidebar