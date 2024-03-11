import '../App.css';

const ArticleCard = (props) => {

    const { article } = props;

    return (
        <div className="article-card">
            <div className="article-info">
                <img src={article.article_img_url} id="article-img"/>
                <h4 id="article-title">{article.title}</h4>
                <p id="article-topic">{article.topic}</p>
                <p id="article-date">{article.created_at}</p>
            </div>
        </div>
    )
}

export default ArticleCard;