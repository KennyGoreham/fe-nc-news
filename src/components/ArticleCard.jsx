import { Link } from 'react-router-dom';

const ArticleCard = (props) => {

    const { article } = props;

    return (
        <div className="article-info">
            <img src={article.article_img_url} id="article-img"/>
            <Link to={`/articles/${article.article_id}`}><h4 id="article-title">{article.title}</h4></Link>
            <p id="article-topic">{article.topic}</p>
            <p id="article-date">{article.created_at}</p>
            <p id="article-comments">✎ {article.comment_count}</p>
            <p id="article-votes">△ {article.votes}</p>
        </div>
    )
}

export default ArticleCard;