import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../components/Article';
import Loading from '../components/Loading';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.realworld.io/api/articles/${slug}`);
        const data = await response.json();
        setArticle(data.article);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  return (
    <div>
      {loading && <Loading />}
      {error && <div>Error: {error}</div>}
      {article && <Article article={article} />}
    </div>
  );
};

export default ArticlePage;
