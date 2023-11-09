import React from 'react'
import Navbar from '../navbar/Navbar'
import { useLocation } from 'react-router-dom';
import './ArticleContent.css'
import {FiThumbsUp} from 'react-icons/fi'

function ArticleContent() {
    const location = useLocation();
    const article = location.state.article;
  return (
    <div>
        <div>
          <Navbar/>
        </div>
        <div className='article-body'>
          <div className='article-title'>{article.title}</div>
          <div className='article-username'>Posted by: {article.username}</div>
          <div className='article-description'>{article.description}</div>
          <div>
            <FiThumbsUp className='home-posts-icon'/>
            <div className='home-posts-tags'>{article.votes}</div>
          </div>
        </div>
    </div>
  )
}

export default ArticleContent