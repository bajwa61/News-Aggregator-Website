import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//Components
import ArticleCard from "./ArticleCard";

const ArticlesList = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedArticles, setLoadedArticles] = useState([]);
  const articlesPerPage = 5;

  const loadArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const newArticles = articles.slice(
      startIndex,
      startIndex + articlesPerPage
    );
    setLoadedArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    setLoadedArticles(articles);
    setCurrentPage(1);
  }, [articles]);

  return (
    <InfiniteScroll
      dataLength={loadedArticles.length}
      next={loadArticles}
      hasMore={loadedArticles.length < articles.length}
      loader={<div className="spinner m-auto"></div>}
      endMessage={
        <p className="text-center">
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {loadedArticles.length > 0 ? (
        loadedArticles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))
      ) : (
        <p className="text-gray-600">No articles found.</p>
      )}
    </InfiniteScroll>
  );
};

export default ArticlesList;
