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
    const [sortByQuery, setSortByQuery] = useState(searchParams.get("sort_by") || "");
    const [orderQuery, setOrderQuery] = useState(searchParams.get("order") || "");

    useEffect(() => {

        setIsLoading(true);

        setSearchParams({
            /* spread ("assign") all current properties in place, then '&&' 
            returns the key/value pair on the right if the condition on the left is
            'truthy', in this case whether the query is not an empty string */
            ...(topicQuery) && { topic: topicQuery },
            ...(sortByQuery) && { sort_by: sortByQuery },
            ...(orderQuery) && { order: orderQuery }
        });

        fetchArticles(topicQuery, sortByQuery, orderQuery, )
        .then((articlesData) => {

            setArticles(articlesData);
            setIsLoading(false);
        })
    }, [topicQuery, sortByQuery, orderQuery]);

    useEffect(() => {

        fetchTopics()
        .then((topicsData) => {
            setTopics(topicsData);
        });
    }, []);

    let numOfArticles = 0;
    let totalNumOfArticles = 0;

    if (articles.length !== undefined) {

        numOfArticles = articles.length;
        totalNumOfArticles = articles[0].total_count
    }

    return isLoading
    ? <Loading />
    : (
        <section className="article-page">
            <h3 className="articles-heading">Showing {numOfArticles} of {totalNumOfArticles} Articles</h3>
            <div className="drop-down-menus">
                <div className="topic-drop-down">
                    <label htmlFor="topic-select" id="topic-label">Topics</label>
                    <select
                        id="topic-select"
                        value={topicQuery}
                        onChange={(event) => {
                            setTopicQuery(event.target.value);
                        }}>
                            <option value="">All</option>
                            {topics.map((topic) => {
                                return <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                            })}
                    </select>
                </div>
                <div className="sort-by-drop-down">
                    <label htmlFor="sort-by-select" id="sort-by-label">Sort by</label>
                    <select
                        id="sort-by-select"
                        value={sortByQuery}
                        onChange={(event) => {
                            setSortByQuery(event.target.value);
                        }}>
                            <option value={"created_at"}>Date</option>
                            <option value={"votes"}>Votes</option>
                            <option value={"comment_count"}>Comment Count</option>
                    </select>
                </div>
                <div className="order-drop-down">
                    <label htmlFor="order-select" id="order-label">Order</label>
                    <select
                        id="order-select"
                        value={orderQuery}
                        onChange={(event) => {
                            setOrderQuery(event.target.value);
                        }}>
                            <option value={"desc"}>Descending</option>
                            <option value={"asc"}>Ascending</option>
                    </select>
                </div>
            </div>
            <ul className="article-card-list">
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article} />
                })}
            </ul>
        </section>
    )
}

export default Articles;