import React from 'react'
import './Book.css'
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

function Book() {
    const location = useLocation();
    const book = location.state.book;
  return (
    <div className='container-book'>
        <div className='container-navbar'>
            <Navbar/>
        </div>
        <div className='container'>
            <div className='upper-container'>
                <div className='book-image' style={{ backgroundImage: `url("${book.image_cdn}")`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <div></div>
                </div>
                <div className='book-container'>
                    <div className='book-content'>
                        <div>{book.title}</div>
                        <div>{book.description}</div>
                        <div className='book-url'>Get Book At: www.exampleurl.com</div>
                    </div>
                </div>
            </div>
            <div className='lower-container'>
                <div className='lower-container-elm'>Price: {book.price}</div>
                <div className='lower-container-elm'>Author: {book.author}</div>
                <div className='lower-container-elm'>Year Published: {book.publication_year}</div>
                <div className='lower-container-elm'>Rating: {book.rating}</div>
                <div className='lower-container-elm'>Language: {book.language}</div>
                <div className='lower-container-elm'>Pages: {book.page_count}</div>
                <div className='lower-container-elm'>Genre: {book.genre}</div>
                <div className='lower-container-elm'>ISBN: {book.isbn}</div>
            </div>
        </div>
        
    </div>
  )
}

export default Book