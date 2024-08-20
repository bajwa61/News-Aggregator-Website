const ArticleUtilService = {
  filterArticles: (
    articles,
    {
      selectedCategories: categories = [],
      selectedSources: sources = [],
      date = "",
    }
  ) => {
    return articles.filter((article) => {
      const matchesCategory =
        categories.length > 0
          ? categories.some(
              (category) =>
                category.toLowerCase() === article.category.toLowerCase()
            )
          : true;

      const matchesSource =
        sources.length > 0
          ? sources.some(
              (source) => source.toLowerCase() === article.source.toLowerCase()
            )
          : true;

      const matchesDate = date
        ? new Date(article.publishedAt).toDateString() ===
          new Date(date).toDateString()
        : true;

      return matchesCategory && matchesSource && matchesDate;
    });
  },

  getPreferredArticles: (articles, preferences) => {
    if (!preferences) {
      return ArticleUtilService.shuffleArray(articles);
    }

    const {
      selectedCategories = [],
      selectedSources = [],
      selectedAuthors = [],
    } = preferences;

    console.log(preferences);

    return articles
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        if (selectedCategories.length > 0) {
          const lowerCaseCategories = selectedCategories.map((cat) =>
            cat.toLowerCase()
          );
          if (
            a.category &&
            lowerCaseCategories.includes(a.category.toLowerCase())
          )
            scoreA += 3;
          if (
            b.category &&
            lowerCaseCategories.includes(b.category.toLowerCase())
          )
            scoreB += 3;
        }

        if (selectedSources.length > 0) {
          const lowerCaseSources = selectedSources.map((src) =>
            src.toLowerCase()
          );
          if (a.source && lowerCaseSources.includes(a.source.toLowerCase()))
            scoreA += 2;
          if (b.source && lowerCaseSources.includes(b.source.toLowerCase()))
            scoreB += 2;
        }

        if (selectedAuthors.length > 0) {
          const lowerCaseAuthors = selectedAuthors.map((auth) =>
            auth.toLowerCase()
          );
          if (a.author && lowerCaseAuthors.includes(a.author.toLowerCase()))
            scoreA += 1;
          if (b.author && lowerCaseAuthors.includes(b.author.toLowerCase()))
            scoreB += 1;
        }

        return scoreB - scoreA;
      })
      .sort(() => 0.5 - Math.random());
  },

  shuffleArray: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  mapNewsApiArticles: (articles) => {
    return articles.map((article) => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      publishedAt: article.publishedAt,
      url: article.url,
      imageUrl: article.urlToImage,
      author: article.author ? article.author.replace("By ", "") : "Unknown",
      category: "General",
    }));
  },

  mapGuardianApiArticles: (articles) => {
    return articles.map((article) => ({
      title: article.fields.headline,
      description: article.fields.trailText,
      source: "The Guardian",
      publishedAt: article.webPublicationDate,
      url: article.fields.shortUrl,
      imageUrl: article.fields.thumbnail,
      author: article.fields.byline
        ? article.fields.byline.replace("By ", "")
        : "Unknown",
      category: article.sectionName || "General",
    }));
  },

  mapNyTimesArticles: (articles) => {
    return articles.map((article) => ({
      title: article.headline.main,
      description: article.abstract || article.lead_paragraph,
      source: "The New York Times",
      publishedAt: article.pub_date,
      url: article.web_url,
      imageUrl:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : null,
      author: article.byline?.original
        ? article.byline.original.replace("By ", "")
        : "Unknown",
      category: article.news_desk || "General",
    }));
  },

  mapNewsApiAiArticles: (articles) => {
    return articles.map((article) => ({
      title: article.title,
      description: article.body,
      source: article.source.title,
      publishedAt: article.date,
      url: article.url,
      imageUrl: article.image,
      author:
        article.authors.length > 0
          ? article.authors.map((author) => author.name).join(", ")
          : "Unknown",
      category: article.source.dataType || "General",
    }));
  },
};

export default ArticleUtilService;
