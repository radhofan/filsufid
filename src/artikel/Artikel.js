import React,{useEffect, useState} from 'react'
import Navbar from '../navbar/Navbar'
import './Artikel.css'
import Axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function Artikel() {
  const [articleTitles, setArticleTitles] = useState([]);
  const [goArticle, setGoArticle] = useState(false);
  const [articleId, setArticleId] = useState('');
  
  const splitIntoColumns = (items, columns) => {
    const result = [];
    for (let i = 0; i < items.length; i += columns) {
      result.push(items.slice(i, i + columns));
    }
    return result;
  };
  const extractedData = articleTitles.map(item => ({ post_id: item.post_id, title: item.title }));
  const columns = splitIntoColumns(extractedData, 5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/api/getarticles');
        console.log(response.data.rows)
        setArticleTitles(response.data.rows)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  function goToArticle(articleId, article){
    setGoArticle(true)
    setArticleId(articleId)
    navigate(`/Artikel/${articleId}`, { state: { article } });
  }


  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [currentPage3, setCurrentPage3] = useState(1);
  const [currentPage4, setCurrentPage4] = useState(1);
  const [currentPage5, setCurrentPage5] = useState(1);
  const itemsPerPage = 15;
  const handlePageChange1 = (page) => {
    setCurrentPage1(page);
  };

  const handlePageChange2 = (page) => {
    setCurrentPage2(page);
  };

  const handlePageChange3 = (page) => {
    setCurrentPage3(page);
  };

  const handlePageChange4 = (page) => {
    setCurrentPage4(page);
  };

  const handlePageChange5 = (page) => {
    setCurrentPage5(page);
  };

  const startIdx1 = (currentPage1 - 1) * itemsPerPage;
  const startIdx2 = (currentPage2 - 1) * itemsPerPage;
  const startIdx3 = (currentPage3 - 1) * itemsPerPage;
  const startIdx4 = (currentPage4 - 1) * itemsPerPage;
  const startIdx5 = (currentPage5 - 1) * itemsPerPage;

  const endIdx1 = startIdx1 + itemsPerPage;
  const endIdx2 = startIdx2 + itemsPerPage;
  const endIdx3 = startIdx3 + itemsPerPage;
  const endIdx4 = startIdx4 + itemsPerPage;
  const endIdx5 = startIdx5 + itemsPerPage;

  const currentItems1 = articleTitles.slice(startIdx1, endIdx1);
  const currentItems2 = articleTitles.slice(startIdx2, endIdx2);
  const currentItems3 = articleTitles.slice(startIdx3, endIdx3);
  const currentItems4 = articleTitles.slice(startIdx4, endIdx4);
  const currentItems5 = articleTitles.slice(startIdx5, endIdx5);
  
  const [goCreateArticle, SetGoCreateArticle] = useState(false);
  function goToCreateArticle(){
    SetGoCreateArticle(true)
  }

  const [searchText, setSearchText] = useState(''); // State to store the search text
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchText(query);

    // Filter articles based on the search query
    const results = articleTitles.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className='artikel'>
      <Navbar/>


      <div className='artikel-main'>
        <div className='artikel-sortbar'>
          <ul>
            <input
              type='text'
              placeholder='Search Article'
              className='home-sortbar-create'
              value={searchText}
              onChange={handleSearchChange}
            />
            {searchText && ( // Check if searchText is not empty
              <div className='article-search-dropdown'>
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((article) => (
                      <li key={article.post_id}>
                        <button
                          onClick={() => goToArticle(article.id, article)}
                        >
                          {article.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No matching articles found.</p>
                )}
              </div>
            )}
            {/* Rest of your code... */}
          </ul>
          <button className='createpost-button' onClick={goToCreateArticle}>Create New Article</button>
          {goCreateArticle && (<Navigate to="/CreateArticle" replace={true} />)}
        </div>
      </div>

      <div className='artikel-sections'>

        <h2>Title 1</h2>
        <div className='article-box-parent'>
          {currentItems1.map((item, index) => (
            <div className="article-box" key={index}>
              <ul className="article-content" onClick={()=>goToArticle(item.id,item)}>
                <li>{item.title}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='pagination'>
          <button
            onClick={() => handlePageChange1(currentPage1 - 1)}
            disabled={currentPage1 === 1}
            className='default-button'
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange1(currentPage1 + 1)}
            disabled={endIdx1 >= articleTitles.length}
            className='default-button'
          >
            Next
          </button>
        </div>
      
          
        <h2>Title 1</h2>
        <div className='article-box-parent'>
          {currentItems2.map((item, index) => (
            <div className="article-box" key={index}>
              <ul className="article-content" onClick={()=>goToArticle(item.id,item)}>
                <li>{item.title}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='pagination'>
          <button
            onClick={() => handlePageChange2(currentPage2 - 1)}
            disabled={currentPage2 === 1}
            className='default-button'
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange2(currentPage2 + 1)}
            disabled={endIdx2 >= articleTitles.length}
            className='default-button'
          >
            Next
          </button>
        </div>

        <h2>Title 1</h2>
        <div className='article-box-parent'>
          {currentItems3.map((item, index) => (
            <div className="article-box" key={index}>
              <ul className="article-content" onClick={()=>goToArticle(item.id,item)}>
                <li>{item.title}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='pagination'>
          <button
            onClick={() => handlePageChange3(currentPage3 - 1)}
            disabled={currentPage3 === 1}
            className='default-button'
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange3(currentPage3 + 1)}
            disabled={endIdx3 >= articleTitles.length}
            className='default-button'
          >
            Next
          </button>
        </div>

        <h2>Title 1</h2>
        <div className='article-box-parent'>
          {currentItems4.map((item, index) => (
            <div className="article-box" key={index}>
              <ul className="article-content" onClick={()=>goToArticle(item.id,item)}>
                <li>{item.title}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='pagination'>
          <button
            onClick={() => handlePageChange4(currentPage4 - 1)}
            disabled={currentPage4 === 1}
            className='default-button'
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange4(currentPage4 + 1)}
            disabled={endIdx4 >= articleTitles.length}
            className='default-button'
          >
            Next
          </button>
        </div>

        <h2>Title 1</h2>
        <div className='article-box-parent'>
          {currentItems5.map((item, index) => (
            <div className="article-box" key={index}>
              <ul className="article-content" onClick={()=>goToArticle(item.id,item)}>
                <li>{item.title}</li>
              </ul>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className='pagination'>
          <button
            onClick={() => handlePageChange5(currentPage5 - 1)}
            disabled={currentPage5 === 1}
            className='default-button'
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange5(currentPage5 + 1)}
            disabled={endIdx5 >= articleTitles.length}
            className='default-button'
          >
            Next
          </button>
        </div>
          
      </div>
    </div>
  )
}

export default Artikel