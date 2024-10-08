const ArticleDataService = {
  fetchArticles: async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Network error:", error);
      return [];
    }
  },
};

export default ArticleDataService;
