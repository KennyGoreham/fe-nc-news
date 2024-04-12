import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Comments from "./Comments.jsx";
import Error from "./Error.jsx";
import Loading from "./Loading.jsx";
import {fetchArticleById, patchArticleById} from "../api.js";

const SingleArticle = () => {

  const {article_id} = useParams();

  const [article, setArticle] = useState({});
  const [errorInfo, setErrorInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    setIsLoading(true);
    fetchArticleById(article_id)
      .then((article) => {

        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {

        setErrorInfo({
          ...errorInfo,
          status: err.response.status,
          message: err.response.data.msg,
        });
      });
  }, [article_id]);

  const voteOnArticle = (article_id, increment) => {
    setArticle((currArticle) => {
      return {
        ...currArticle, votes: article.votes + increment,
      };
    });
    patchArticleById(article_id, increment);
  };

  const date = new Date(article.created_at);
  const formattedDate = date.toLocaleString("en-GB");

  if(Object.keys(errorInfo).length !== 0) return <Error status={errorInfo.status} message={errorInfo.message} />;

  return isLoading
    ? <Loading />
    : (
      <article className="single-article-page">
        <header>
          <h2 id="single-article-heading">{article.title}</h2>
          <div className="single-article-header-info">
            <Link to={`/articles?topic=${article.topic}`} id="single-article-topic-link"><p id="single-article-topic-text">{article.topic}</p></Link>
            <p id="single-article-date">{formattedDate}</p>
          </div>
          <Link to={`/users/${article.author}`} id="single-article-author-link"><h3 id="single-article-author-heading">{article.author}</h3></Link>
          <img src={article.article_img_url} id="single-article-image"/>
        </header>
        <p id="single-article-body">{article.body}</p>
        <div className="vote-button-container">
          <button id="single-article-upvotes-button" onClick={() => {
            voteOnArticle(article.article_id, 1);
          }}>△</button>
          <p id="single-article-votes">{article.votes}</p>
          <button id="single-article-downvotes-button" onClick={() => {
            voteOnArticle(article.article_id, -1);
          }}>▽</button>
        </div>
        <Comments article_id={article_id}/>
      </article>
    );
};

export default SingleArticle;
