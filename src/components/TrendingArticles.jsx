import {useEffect, useState} from "react";
import Loading from "./Loading.jsx";
import TrendyCard from "./TrendyCard.jsx";
import {fetchArticles} from "../api.js";

const TrendingArticles = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [trendyArticles, setTrendyArticles] = useState([]);

  useEffect(() => {

    setIsLoading(true);
    fetchArticles("", "comment_count", "desc", 3, 1)
      .then(({articles}) => {

        setTrendyArticles(articles);
        setIsLoading(false);
      });
  }, []);

  return isLoading
    ? <Loading />
    : (
      <>
        <h3 id="trending-articles-heading">Trending Articles</h3>
        <ul className="trendy-article-cards">
          {trendyArticles.map((trendyArticle) => {
            return <TrendyCard key={trendyArticle.article_id} trendyArticle={trendyArticle} />;
          })}
        </ul>
      </>
    );
};

export default TrendingArticles;
