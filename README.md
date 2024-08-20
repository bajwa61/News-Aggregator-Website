# News Aggregator Website

## Introduction
The news aggregator website is a mobile-friendly platform developed using React.js. Users can search for articles using the search box, and all relevant articles are then fetched and displayed from multiple news sources.

**Live Link:** [Your Live Link Here]

## Features

### Article Search and Filtering
- Users can search for articles by keywords.
- Results are fetched from multiple sources and displayed to the user.
- Users can apply filters on the fetched articles based on:
  - Publication date
  - Category
  - Source

### Personalized News Feed
- Users can personalize their news feed by specifying preferences such as:
  - Favorite authors
  - Preferred categories
  - Preferred sources
- The website stores user preferences in cookies.
- An algorithm is used to rank each article based on the user's preferences.
- Articles are sorted based on their relevance scores, ensuring that the most preferred articles appear first.

### Infinite Scrolling
- Users can continue scrolling down to load more articles without clicking a "Load More" button, creating a seamless and continuous browsing experience.

### Data Sources
- The website integrates with NewsAPI, The Guardian, and NewsAPI.org to pull in a diverse range of articles.

### Mobile-Responsive Design
- The website is fully optimized for mobile devices, providing a seamless experience across different screen sizes.

### Error Handling and Notifications
- The app includes robust error handling mechanisms that provide users with clear feedback in case of any issues with loading articles.
- If an error occurs while fetching data from any of the sources, a user-friendly error message is displayed.

### Debounced Search
- The search functionality is optimized with a debounce mechanism, which delays the search execution until the user has finished typing.
- This reduces the number of unnecessary API calls and enhances performance.

## How to Run

### Prerequisites
Before running the application, ensure you have installed Docker on your machine. You can download Docker from [Docker's official website](https://www.docker.com/get-started).

### Step 1: Clone the Repository
If you haven't already, clone the repository:

git clone https://github.com/yourusername/your-repo.git

cd your-repo

### Step 2: Build and Run the Docker Container
Navigate to the root directory of your project (where the Dockerfile is located) and build the Docker image, then run the container:

Build the Docker image

**docker build -t news-aggregator-ui .**

Run the Docker container

**docker run -p 3000:3000 news-aggregator-ui**

where

-t news-aggregator-ui: Tags the image with the name news-aggregator-ui.
. : Specifies the current directory as the build context.

### Step 3: Access the Application

Once the container is running, open your web browser and navigate to:

http://localhost:3000

You should see the application running.
