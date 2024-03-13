import { Link } from 'react-router-dom';

const ArticleCard = (props) => {

    const { article } = props;

    return (
        <div className="article-card">
            <div className="article-info">
                <img src={article.article_img_url} id="article-img"/>
                <Link to={`/articles/${article.article_id}`}><h4 id="article-title">{article.title}</h4></Link>
                <p id="article-topic">{article.topic}</p>
                <p id="article-date">{article.created_at}</p>
            </div>
        </div>
    )
}

export default ArticleCard;