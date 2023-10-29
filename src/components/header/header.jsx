import React from 'react'
import './header.css'
import logo from '../../assets/img/logo.png'
import profileIcone from '../../assets/img/profil.png'
import logoutIcone from '../../assets/img/logout.png'
import addIcon from '../../assets/img/plus.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const user = localStorage.getItem("user")

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.setItem('user',null)
    localStorage.setItem('token',null)
    navigate('/')
  }

  const handleProfil = () => {
    if(!user || JSON.parse(user) === null) {
      navigate('/login')
    } else {
      navigate('/profile')
    }
  }

  return (
	  <div className='header'>
      <a href='/' className='header_logo'><img src={logo} alt="Logo"/></a>
      <div className='header_right'>
        {
          user
          && JSON.parse(user) !== null
          && JSON.parse(user).role === "pilote" ?
            (<a href='/newflight' className='header_newflight'><img src={addIcon} alt="Logo"/></a>)
          :(<></>)
        }
        
        <button className='button_profil' onClick={handleProfil}><img src={profileIcone} alt="Icone profil"/></button>
        {
          user && JSON.parse(user) !== null ?
          (<button className="button_logout" onClick={handleLogout}><img src={logoutIcone} alt="Icone logout"/></button>)
          :(<></>)
        }
      </div>
    </div>
  )
}

export default Header