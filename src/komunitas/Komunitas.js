import React, {useEffect, useState} from 'react'
import Navbar from '../navbar/Navbar'
import './Komunitas.css'
import {BsFire} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'
import {FiThumbsUp} from 'react-icons/fi'
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function Komunitas() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/examplepost');
        setPosts(response.data.rows)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 
  const category = ["Category 1", "Category 1", "Category 1", "Category 1"]
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [postId, setPostId] = useState('');
  const [goPost, setGoPost] = useState(false);
  const navigate = useNavigate();
  function goToPost(post_id, post){
    setPostId(post_id)
    navigate(`/Komunitas/${post_id}`, { state: { post } });
    setGoPost(true)
  }

  const [create, setCreate] = useState(false);
  function createPost(){
    setCreate(true);
  }

  return (
    <div>
      <Navbar/>
      <div className='komunitas-parent'>
        <div className='komunitas-category'>
          <div className='komunitas-categories'>Categories: </div>
          {category.map((item, index) => (
            <li key={index} className='komunitas-categories'>{item}</li>
          ))}
        </div>
        <div className='komunitas-main'>
          <div className='komunitas-sortbar'>
              <ul>
                <BsFire className='home-sortbar-icon'/>
                <li className='home-sortbar-li'>Trending</li>
                <AiOutlineStar className='home-sortbar-icon'/>
                <li className='home-sortbar-li'>New</li>
                <FiThumbsUp className='home-sortbar-icon'/>
                <li className='home-sortbar-li'>Best</li>
                <input type='text' onClick={createPost} placeholder='create post' className='home-sortbar-create'></input>
                {create && (<Navigate to="/CreatePost" replace={true} />)}
              </ul>
          </div>
          <div className='komunitas-postbar'>
              {currentPosts.map((post, index) => (
                <div key={index} className='home-posts' onClick={()=>goToPost(post.post_id, post)}>
                  <p className='home-posts-username'>Posted by: {post.username}</p>
                  <div className='home-posts-title'>{post.title}</div>
                  <p className='home-posts-desc'>{post.description}</p>
                  <div className='home-posts-utility'>
                    <div className='home-posts-tags'>{post.tags}</div>
                    <FiThumbsUp className='home-posts-icon'/>
                    <div className='home-posts-tags'>{post.votes}</div>
                    <div className='home-posts-tags'>{post.timestamp}</div>
                  </div>
                </div>
              ))}
              {goPost && (<Navigate to={`/Komunitas/${postId}`} replace={true} />)}
          </div>
        </div>
        {/* Pagination */}
        <div className='pagination'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className='default-button'
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPost >= posts.length}
            className='default-button'
          >
            Next
          </button>
        </div>


      </div>
    </div>
  )
}

export default Komunitas