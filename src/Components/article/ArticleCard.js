import React, { useEffect } from "react";

const ArticleCard = ({ article }) => {
  if (!article?.title || !article?.imageUrl) return null;

  return (
    <div className="mt-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:flex-row lg:flex-row-reverse lg:w-[1200px]">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg lg:rounded-lg lg:h-[280px] lg:w-[300px]"
        src={article.imageUrl}
        alt={article.title}
      />
      <div className="flex flex-col justify-between p-4 lg:w-[800px]">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {article.title}
        </h5>
        <p className="mb-3 text-gray-700 dark:text-gray-400">
          {article.description?.length > 200
            ? `${article.description.substring(0, 100)}...`
            : article.description}
        </p>
        <div className="flex flex-col lg:flex-row justify-between text-sm text-gray-500 dark:text-gray-400 mt-2 font-extrabold">
          <span>Author: {article.author || "Unknown"}</span>
          <span>Category: {article.category || "General"}</span>
          <span>Source: {article.source || "Unknown"}</span>
          <span>
            Date: {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-4 lg:max-w-[130px]">
          <div
            className="flex justify-center items-center lg:px-5 px-3 py-2 bg-secondary text-white font-bold rounded-xl hover:bg-white hover:text-secondary transition-all duration-400 hover:border hover:border-secondary cursor-pointer"
            onClick={() => window.open(article.url, "_blank")}
            role="button"
            tabIndex={0}
          >
            Read More
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
