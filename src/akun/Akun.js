import React,{useEffect, useState} from 'react'
import Navbar from '../navbar/Navbar.js'
import './Akun.css'
import {login, logout} from "../Store"
import { useDispatch, useSelector } from "react-redux"
import Axios from 'axios'
import { Navigate } from 'react-router-dom'

function Akun() {

  const usernameStore = useSelector((state)=> state.akun.value.username)

  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState(usernameStore || '')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  //const [masuk, setMasuk] = useState(localStorage.getItem('masuk') === 'true' || false);
  const [profil, setProfil] = useState(false)


  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'));
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //   localStorage.setItem('masuk', masuk)
  // },[masuk])

  useEffect(() => {
    setUsername(usernameStore);
  }, [usernameStore]);
  

  function functionSetUsername(e){
    setUsername(e.target.value)
  }
  function functionSetPassword(e){
    setPassword(e.target.value)
  }
  function functionSetEmail(e){
    setEmail(e.target.value)
  }
  function funcSubmit(e){
    e.preventDefault();
    if(mode === 'login'){
      const fetchData = async () => {
        try {
          await Axios.post('http://localhost:3001/api/loginuser',{
            username: username,
            password: password,
          }).then((response)=>{
            if(response.data != false){
              //setMasuk(true)
              dispatch(login({username: username, userid: response.data.rows[0].id_user}))
              // setMasuk((prevTest) => !prevTest);
              // localStorage.setItem('masuk', !masuk);
              goToProfil()
            }
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          await Axios.post('http://localhost:3001/api/registeruser',{
            username: username,
            password: password,
            email: email,
          }).then((response)=>{
            if(response.data === true){
              alert('Berhasil Register, Silahkan login!')
              setUsername('');
              setPassword('');
              setEmail('');
            } else {
              alert('Username Or Email Already Exist!')
              setUsername('');
              setPassword('');
              setEmail('');
            }
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } 
  }

  function goToProfil(){
    setProfil(true)
  }

  return (
    <div className='akun-parent'>
      <Navbar/>
      <div className='akun-container' onSubmit={funcSubmit}>
        <div className='akun-left'>
          <div className='akun-kiri-title'>Selamat Datang di Filsuf.ID</div>
          <div className='akun-kiri-desc'>Sebuah tempat untuk para penggemar filsuf Indonesia <br /> untuk bertukar pikiran, beraspirasi dan belajar bersama</div>
        </div>
        <div className='akun-right'>
          <form className='akun-form'>
            <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
              <div>
                <div className="akun-form-group">
                  <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" onChange={functionSetUsername} value={username}/>
                </div>
                < div className="akun-form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" placeholder="Enter your password" onChange={functionSetPassword} value={password}/>
                </div>
                {mode === 'register' && (  // Conditionally render the email field for the register form
                  <div className="akun-form-group">
                      <label htmlFor="email">Email:</label>
                      <input type="email" id="email" name="email" placeholder="Enter your email" onChange={functionSetEmail} value={email}/>
                  </div>
                )}
                <div className="akun-form-group">
                  <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
                  {profil && (<Navigate to="/Profil" replace={true} />)}
                </div>
                <p onClick={toggleMode}>
                  {mode === 'login' ? 'Belum memiliki akun pribadi?' : 'Saya sudah memiliki akun'}
                </p>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Akun