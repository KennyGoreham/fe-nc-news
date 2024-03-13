import { useEffect, useState } from 'react';
import { fetchArticles } from '../api.js';
import ArticleCard from './ArticleCard.jsx';
import Loading from './Loading.jsx';

const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        fetchArticles()
        .then((articlesData) => {
            
            setArticles(articlesData);
            setIsLoading(false);
        })
    }, []);

    let numOfArticles = 0;
    if (articles.length !== undefined) numOfArticles = articles.length;

    return isLoading
    ? <Loading />
    : (
        <section>
            <h3 className="articles-heading">Showing {numOfArticles} Articles</h3>
            <ul className="article-card-list">
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article} />
                })}
            </ul>
        </section>
    )
}

export default Articles;