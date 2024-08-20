import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";

// Components
import AnnouncementBar from "../Components/common/AnnouncementBar";
import Navbar from "../Components/common/Navbar";
import ArticlesList from "../Components/article/ArticlesList";
import Filters from "../Components/filter/Filters";
import FilterModal from "../Components/modal/FilterModal";
import NewsfeedModal from "../Components/modal/NewsfeedModal";

// Services
import ArticleUtilService from "../Services/article/ArticleUtilService";
import ArticleDataService from "../Services/article/ArticleDataService";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAndPrioritizeArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [newsApiData, guardianData, newsApiAiData] =
        await Promise.allSettled([
          ArticleDataService.fetchArticles(
            `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
          ),
          ArticleDataService.fetchArticles(
            `https://content.guardianapis.com/search?q=${query}&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}&show-fields=trailText,headline,byline,thumbnail,shortUrl,sectionName`
          ),
          ArticleDataService.fetchArticles(
            `https://eventregistry.org/api/v1/article/getArticles?keyword=${query}&apiKey=${process.env.REACT_APP_NEWS_AI_API_KEY}`
          ),
        ]);

      const articles = [
        ...(newsApiData?.status === "fulfilled"
          ? ArticleUtilService.mapNewsApiArticles(
              newsApiData?.value?.articles || []
            )
          : []),
        ...(guardianData?.status === "fulfilled"
          ? ArticleUtilService.mapGuardianApiArticles(
              guardianData?.value?.response?.results || []
            )
          : []),
        ...(newsApiAiData?.status === "fulfilled"
          ? ArticleUtilService.mapNewsApiAiArticles(
              newsApiAiData?.value?.articles?.results || []
            )
          : []),
      ];

      const preferences = Cookies.get("userPreferences")
        ? JSON.parse(Cookies.get("userPreferences"))
        : null;

      const preferredArticles = ArticleUtilService.getPreferredArticles(
        articles,
        preferences
      );

      setArticles(preferredArticles);
      setFilteredArticles(preferredArticles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      const debounceTimeout = setTimeout(() => {
        fetchAndPrioritizeArticles();
      }, 700);

      return () => clearTimeout(debounceTimeout);
    }
  }, [query, fetchAndPrioritizeArticles]);

  const handleFiltersChange = (filters) => {
    const filtered = ArticleUtilService.filterArticles(articles, filters);
    setFilteredArticles(filtered);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setIsFilterOpen(false);
  };

  return (
    <div className="news-aggregator min-h-screen">
      <AnnouncementBar />
      <Navbar
        title="News Aggregator"
        setIsModalOpen={setIsModalOpen}
        query={query}
        onChange={setQuery}
        showFilters={articles.length > 0}
      />
      <div className="container lg:w-[1200px] w-[95vw] md:w-[85vw] mx-auto mt-10 min-h-[500px]">
        {articles.length > 0 && <Filters setIsOpenModal={setIsFilterOpen} />}
        {loading ? (
          <div className="spinner m-auto"></div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredArticles.length > 0 ? (
          <ArticlesList articles={filteredArticles} />
        ) : query ? (
          <p className="text-gray-600">
            No articles found. Try a different query or adjust your filters.
          </p>
        ) : (
          <p className="text-gray-600">Search to view articles.</p>
        )}
      </div>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onChange={handleFiltersChange}
      />
      <NewsfeedModal isOpen={isModalOpen} onClose={handleModalToggle} />
    </div>
  );
};

export default HomePage;
