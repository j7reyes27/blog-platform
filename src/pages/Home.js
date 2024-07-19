import React, { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import './Home.css';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchArticles = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.realworld.io/api/articles?limit=5&offset=${(page - 1) * 5}`);
      const data = await response.json();
      setArticles(data.articles);
      setTotalPages(Math.ceil(data.articlesCount / 5));
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  return (
    <div>
      <header className="header">
        <h1>Realworld Blog</h1>
        <div className="auth-buttons">
          <button className="sign-in">Sign In</button>
          <button className="sign-up">Sign Up</button>
        </div>
      </header>
      {loading && <Loading />}
      {error && <div>Error: {error}</div>}
      <ArticleList articles={articles} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchArticles}
      />
    </div>
  );
};

export default Home;
