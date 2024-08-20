import React, { useState, useEffect } from "react";

// Services
import ArticleConstantService from "../../Services/article/ArticleConstantService";

const AnnouncementBar = () => {
  const { announcements } = ArticleConstantService;

  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex(
        (prevIndex) => (prevIndex + 1) % announcements.length
      );
    }, 1000 * 5);
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="announcement-bar bg-secondary text-white p-2 text-center">
      <div className="animate-fade-in-out lg:text-base md:text-base text-sm">
        {announcements[currentAnnouncementIndex]}
      </div>
    </div>
  );
};

export default AnnouncementBar;
