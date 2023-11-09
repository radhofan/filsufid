import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './PostContent.css';
import Axios from 'axios';
import { FiThumbsUp } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function PostContent() {
  const location = useLocation();
  const post = location.state.post;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); // State to track the new comment

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.post('http://localhost:3001/api/findcomments', {
          post_id: post.post_id,
        });
        setComments(response.data.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, [post.post_id]);

  const userId= useSelector((state)=> state.akun.value.userid)
  const username= useSelector((state)=> state.akun.value.username)
  const uploadPost = async () => {
    const fetchData = async () => {
      try {
        await Axios.post('http://localhost:3001/api/postcomment',{
          post_id: post.post_id,
          user_id: userId,
          username: username,
          description: newComment,
        }).then((response)=>{
          console.log(response.data)
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    //setComments([...comments, { description: newComment, username: 'YourUsername', votes: 0 }]);
    uploadPost();
    setNewComment('');
  };

  function test(){
    console.log(comments)
  }

  return (
    <div className='post-container'>
      <div>
        <Navbar />
      </div>
      <div className='post-content'>
        <p>Posted By: {post.username}</p>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div>
          <FiThumbsUp className='home-sortbar-icon' />
          <p>{post.votes}</p>
        </div>
          <div className="comment-input-container">
            Make Comment:
            <textarea
              rows="4"  // Adjust the number of rows as needed to make it bigger
              value={newComment}
              onChange={handleCommentChange}
            />
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
      </div>
      {/* <button onClick={test}>TEST</button> */}
      {comments.length > 0 && (
        comments.map((comment, index) => (
          <div key={index} className='post-content'>
            <p>Posted by: {comment.username}</p>
            <p>{comment.description}</p>
            <div>
              <FiThumbsUp className='home-sortbar-icon' />
              <p>{comment.votes}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PostContent;
