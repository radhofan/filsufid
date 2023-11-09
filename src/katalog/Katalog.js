import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar.js';
import './Katalog.css';
import Axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Katalog() {
  const sampleList = ["Aesthetics", "Epistemology", "Ethics", "Logic", "Metaphysics"];
  const sortby = ["Most Popular", "New"];

  const [goBook, setGoBook] = useState(false)
  const navigate = useNavigate();
  const [bookId, setBookId] = useState('');
  function goToBook(book_id, book){
    setBookId(book_id)
    navigate(`/Book/${book_id}`, { state: { book } });
    setGoBook(true)
  }

  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/getbooks');
        setBooks(response.data.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const maxBooksPerPage = 10; // Maximum number of books per page
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * maxBooksPerPage;
  const endIndex = Math.min(currentPage * maxBooksPerPage, books.length);
  const displayedBooks = books.slice(startIndex, endIndex);

  const totalPages = Math.ceil(books.length / maxBooksPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const previousButtonStyle = isPreviousDisabled
  ? { backgroundColor: '#ccc', color: '#888', cursor: 'not-allowed' }
  : {}; // Empty object for enabled style

  const nextButtonStyle = isNextDisabled
    ? { backgroundColor: '#ccc', color: '#888', cursor: 'not-allowed' }
    : {}; // Empty object for enabled style

  return (
    <div className='katalog-parent'>
      <Navbar />
      <div className='katalog-gambar'>
        <div className='katalog-gambar-tulisan'>Ilmu pengetahuan</div>
      </div>
      <div className='katalog-content'>
        <div className='katalog-content-filter'>
          <ul className='katalog-tags'>
            <div className='katalog-tags-tulisan'>Tags</div>
            {sampleList.map((item, index) => (
              <li key={index} className='katalog-elements'>{item}</li>
            ))}
          </ul>
        </div>
        <div className='katalog-content-searchbarang'>
          <div className='katalog-content-searchbarang-search'>
              <div className='katalog-content-searchbarang-search-searchbar'>
                <div className='katalog-articlesearch'>Search Article Name: </div>
                <input type='text'></input>
              </div>
              <div className='katalog-content-searchbarang-search-searchfilter'>
                <div>Sort By |</div>
                {sortby.map((item, index) => (
                  <li key={index} className='katalog-newpopular'>{item}</li>
                ))}
              </div>
          </div>
          <div className='katalog-content-searchbarang-products'>
            {displayedBooks.map((book, index) => (
              <div className='grid-items' key={index} onClick={()=>goToBook(book.book_id, book)}>
                <div className='grid-item' style={{ backgroundImage: `url("${book.image_cdn}")`, backgroundSize: 'cover' }}>
                  {/* Item {index + 1} */}
                </div>
                <div>{book.title}</div>
                {goBook && (<Navigate to={`/Book/${bookId}`} replace={true} />)}
              </div>
            ))}
          </div>
          <div className='pagination-katalog'>
            <button className={`default-button-katalog ${isPreviousDisabled ? 'disabled-button-katalog' : ''}`} style={previousButtonStyle} onClick={goToPreviousPage} disabled={isPreviousDisabled}>
              Previous
            </button>
            <button className={`default-button-katalog ${isNextDisabled ? 'disabled-button-katalog' : ''}`} style={nextButtonStyle} onClick={goToNextPage} disabled={isNextDisabled}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Katalog;
