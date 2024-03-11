import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById} from '../api.js';
import Loading from './Loading.jsx';

const SingleArticle = () => {

    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        fetchArticleById(article_id)
        .then((article) => {

            setArticle(article);
            setIsLoading(false);
        })
    }, [article_id]);

    return isLoading
    ? <Loading />
    : (
        <div className="single-article-page">
            <header>
                <h2 id="article-heading">{article.title}</h2>
                <img src={article.article_img_url} id="single-article-image"/>
            </header>
            <article className="single-article">
                <h3 id="article-author">{article.author}</h3>
                <p id="article-body">{article.body}</p>
                <section className="single-article-info">
                    <h4 id="article-topic">{article.topic}</h4>
                    <h4 id="article-date">{article.created_at}</h4>
                </section>
                <p id="article-votes">Votes: {article.votes}</p>
            </article>
        </div>
    )
}

export default SingleArticle;