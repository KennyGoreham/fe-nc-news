import {Link} from "react-router-dom";

const TrendyCard = (props) => {

  const {trendyArticle} = props;

  return (
    <div className="trendy-article-info">
      <img src={trendyArticle.article_img_url} id="trendy-article-img"/>
      <Link to={`/articles/${trendyArticle.article_id}`} id="trendy-article-title-link"><h4 id="trendy-article-title">{trendyArticle.title}</h4></Link>
      <p id="trendy-article-topic"><span id="trendy-article-topic-span">{trendyArticle.topic}</span></p>
    </div>
  );
};

export default TrendyCard;
