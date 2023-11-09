import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar.js'
import Axios from 'axios';
import { useSelector } from 'react-redux';
import './CreatePost.css'

function CreatePost() {

  const userid = useSelector((state)=> state.akun.value.userid)

  const [titleText, setTitleText] = useState('');
  const [descText, setDescText] = useState('');

  const handleTitleInput = (e) => {
    setTitleText(e.target.value);
  }; 
  const handleDescInput = (e) => {
    setDescText(e.target.value); 
  };

  const username= useSelector((state)=> state.akun.value.username)
  const uploadPost = async () => {
    //const fileId = await uploadImageToGoogleDrive(selectedImage);
    const fetchData = async () => {
      try {
        await Axios.post('http://localhost:3001/api/createpost',{
          userid: userid,
          username: username,
          title: titleText,
          desc: descText,
          imageUrl: '',
          tags: 'Test',
          votes: 0,
        }).then((response)=>{
          console.log(response.data)
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };

  return (
    <div className='createpost'>

        <div>
          <Navbar/>
        </div>

        <div className='createpost-container'>
          <div className='createpost-main'>
            <h1>Create Post</h1>
            
            <h2>Post Title:</h2>
            <textarea
              value={titleText}
              onChange={handleTitleInput}
              rows="5"
              cols="50"
              placeholder="Enter text here..."
            />
             

            <h2>Post Description:</h2>
            <textarea
              value={descText}
              onChange={handleDescInput}
              rows="5"
              cols="50"
              placeholder="Enter text here..."
            />


            <div>
              <button className='createpost-button' onClick={uploadPost}>Upload Post</button>
            </div>
          </div>

          <div className='createpost-preview'>
              <h2>Title Preview:</h2>
              <div className='createpost-preview-box'>
                {titleText && (
                  <div>
                    <p className='createpost-preview-text'>{titleText}</p>
                  </div>
                )}
              </div>
              <h2>Description Preview:</h2>
              <div className='createpost-preview-box'>
                {descText && (
                  <div>
                    <p  className='createpost-preview-text'>{descText}</p>
                  </div>
                )}
              </div> 
          </div>
          
        </div>

    </div>
  )
}

export default CreatePost






