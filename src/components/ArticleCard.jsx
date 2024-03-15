import { Link } from 'react-router-dom';

const ArticleCard = (props) => {

    const { article, setTopicQuery } = props;

    const date = new Date(article.created_at);
    const formattedDate = date.toLocaleString('en-GB');

    return (
        <div className="article-info">
            <img src={article.article_img_url} id="article-img"/>
            <Link to={`/articles/${article.article_id}`} id="article-title"><h4>{article.title}</h4></Link>
            <Link to={`/articles?topic=${article.topic}`} id="article-topic-link" onClick={() => {
                setTopicQuery(article.topic);
            }}><p id="article-topic"><span id="topic-span">{article.topic}</span></p></Link>
            <p id="article-date">{formattedDate}</p>
            <p id="article-comments">✎ {article.comment_count}</p>
            <p id="article-votes">△ {article.votes}</p>
        </div>
    )
}

export default ArticleCard;