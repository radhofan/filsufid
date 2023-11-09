import React, {useState} from 'react'
import './Navbar.css'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {

  const [home, setHome] = useState(false)
  const [komunitas, setKomunitas] = useState(false)
  const [artikel, setArtikel] = useState(false)
  const [katalog, setKatalog] = useState(false)
  const [akun, setAkun] = useState(false)
  const [profile, setProfile] = useState(false)

  function goHome(){
    setHome(true)
  }
  function goKomunitas(){
    setKomunitas(true)
  }
  function goArtikel(){
    setArtikel(true)
  }
  function goKatalog(){
    setKatalog(true)
  }
  function goAkun(){
    if(username != ""){
      setProfile(true)
    }else{
      setAkun(true)
    }
  }

  const username = useSelector((state)=> state.akun.value.username)

  return (
    <div className="navbar">
      <div className="navbar-title">Filsuf.ID</div>
      <div className="navbar-items">
        <div className="navbar-item" onClick={goHome}>Home</div>
        {home && (<Navigate to="/" replace={true} />)}
        <div className="navbar-item" onClick={goKomunitas}>Komunitas</div>
        {komunitas && (<Navigate to="/Komunitas" replace={true} />)}
        <div className="navbar-item" onClick={goArtikel}>Artikel</div>
        {artikel && (<Navigate to="/Artikel" replace={true} />)}
        <div className="navbar-item" onClick={goKatalog}>Katalog Belajar</div>
        {katalog && (<Navigate to="/Katalog" replace={true} />)}
        {username ? (
          <div className="navbar-item" onClick={goAkun}>{username}</div>
          ) : (
          <div className="navbar-item" onClick={goAkun}>Akun</div>
        )}
        {akun && (<Navigate to="/Akun" replace={true} />)}
        {profile && (<Navigate to="/Profil" replace={true} />)}
      </div>
    </div>
  )
}

export default Navbar