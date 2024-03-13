import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchArticles, fetchTopics } from '../api.js';
import ArticleCard from './ArticleCard.jsx';
import Loading from './Loading.jsx';

const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [topicQuery, setTopicQuery] = useState(searchParams.get("topic") || "");

    useEffect(() => {

        setIsLoading(true);
        topicQuery
        ? setSearchParams({ topic: topicQuery })
        : setSearchParams({});

        fetchArticles(topicQuery)
        .then((articlesData) => {

            setArticles(articlesData);
            setIsLoading(false);
        })
    }, [topicQuery]);

    useEffect(() => {

        fetchTopics()
        .then((topicsData) => {
            setTopics(topicsData);
        });
    }, []);

    let numOfArticles = 0;
    if (articles.length !== undefined) numOfArticles = articles.length;

    return isLoading
    ? <Loading />
    : (
        <section>
            <h3 className="articles-heading">Showing {numOfArticles} Articles</h3>
            <label htmlFor="topics-drop-down">Topics</label>
            <select
                id="topics-drop-down"
                value={topicQuery}
                onChange={(event) => {
                    setTopicQuery(event.target.value);
                }}>
                    <option value="">All</option>
                    {topics.map((topic) => {
                        return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                    })}
            </select>
            <ul className="article-card-list">
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article} />
                })}
            </ul>
        </section>
    )
}

export default Articles;