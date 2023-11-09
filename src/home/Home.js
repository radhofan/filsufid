import React, {useEffect, useState} from 'react'
import './Home.css'
import {BsFire} from 'react-icons/bs'
import {AiOutlineStar} from 'react-icons/ai'
import {FiThumbsUp} from 'react-icons/fi'
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {
  const latestArticle = ["Aesthetics", "Epistomology", "Ethics", "Logic", "Metaphysics"];
  const recommendedArticle = ["Aesthetics", "Epistomology", "Ethics", "Logic", "Metaphysics"];
  const [posts, setPosts] = useState([]);
  const [goPost, setGoPost] = useState(false);
  const [postId, setPostId] = useState('');

  // Define pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // Calculate the index of the last post on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


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
  
  const [create, setCreate] = useState(false);
  function createPost(){
    setCreate(true);
  }

  const navigate = useNavigate();
  function goToPost(post_id, post){
    setPostId(post_id)
    navigate(`/Komunitas/${post_id}`, { state: { post } });
    setGoPost(true)
  }

  return (
    <div className="section">
       <div className='home-sidebar'>

          <ul className='home-latest'>
            <div className='latest-div'>Latest Article</div>
            {latestArticle.map((item, index) => (
              <li key={index} className='latest-elements' >{item}</li>
            ))}
          </ul>

          <ul className='home-latest'>
            <div className='latest-div'>Recommended Article</div>
            {recommendedArticle.map((item, index) => (
              <li key={index} className='latest-elements' >{item}</li>
            ))}
          </ul>
          
          <ul className='home-latest'>
            <div className='latest-div'>Explore More</div>
            <div className='latest-div'>Ask a Question</div>
          </ul>

       </div>

       <div className='home-mainbar'>
       <div className='home-titlebar'>Selamat Datang di filsuf.id</div>
        <div className='home-sortbar'>
          <ul>
            <BsFire className='home-sortbar-icon'/>
            <li className='home-sortbar-li'>Trending</li>
            <AiOutlineStar className='home-sortbar-icon'/>
            <li className='home-sortbar-li'>New</li>
            <FiThumbsUp className='home-sortbar-icon'/>
            <li className='home-sortbar-li'>Best</li>
            <input type='text'  onClick={createPost} placeholder='create post' className='home-sortbar-create'></input>
            {create && (<Navigate to="/CreatePost" replace={true} />)}
          </ul>
        </div>
        <div className='home-postbar'>
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
       <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="default-button"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPost >= posts.length}
            className="default-button"
          >
            Next
          </button>
        </div>

    </div>
  )
}

export default Home