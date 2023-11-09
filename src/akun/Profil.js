import React,{useEffect, useState} from 'react'
import Navbar from '../navbar/Navbar'
import { useDispatch, useSelector } from "react-redux"
import {login, logout} from "../Store"
import { Navigate } from 'react-router-dom'
import './Profil.css'

function Profil() {
  const usernameStore = useSelector((state)=> state.akun.value.username)
  const dispatch = useDispatch();
  const [akun, setAkun] = useState(false)
  function logoutProfil(){
    dispatch(logout());
    setAkun(true)
  }
  return (
    <div>
        <div>
          <Navbar/>
        </div>

        <div className='profil-screen'>
          <div className='profil-main'>
              <div className='profil-username'>Welcome {usernameStore}!</div>
              <div className='profil-group'>
                <div className='profil-username'>Posts: </div>
                <div className='profil-username'>Create new post</div>
              </div>
              <div className='profil-group'>
                <div className='profil-username'>Article: </div>
                <div className='profil-username'>Create new article</div>
              </div>
              <div className='profil-email'>Email address: </div>
              <button className='profil-button' onClick={logoutProfil}>Logout</button>
              {akun && (<Navigate to="/Akun" replace={true} />)}
          </div>
        </div>
    </div>
  )
}

export default Profil