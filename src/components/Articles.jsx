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
    const [sortByQuery, setSortByQuery] = useState(searchParams.get("sort_by") || "created_at");
    const [orderQuery, setOrderQuery] = useState(searchParams.get("order") || "desc");
    const [limitQuery, setLimitQuery] = useState(10);
    const [pageQuery, setPageQuery] = useState(1);

    useEffect(() => {

        setIsLoading(true);
        setLimitQuery(10);
        setPageQuery(1);

        setSearchParams(() => {
            return {
                ...(topicQuery) && { topic: topicQuery },
                sort_by: sortByQuery,
                order: orderQuery,
                limit: limitQuery,
                p: pageQuery
            };
        });

        fetchArticles(topicQuery, sortByQuery, orderQuery)
        .then((articlesData) => {

            setArticles(articlesData);
            setIsLoading(false);
        });
    }, [topicQuery, sortByQuery, orderQuery]);

    useEffect(() => {

        setIsLoading(true);
        setPageQuery(1);
        setSearchParams(() => {
            return {
                ...(topicQuery) && { topic: topicQuery },
                sort_by: sortByQuery,
                order: orderQuery,
                limit: limitQuery,
                p: 1
            };
        });

        fetchArticles(topicQuery, sortByQuery, orderQuery, limitQuery)
        .then((articlesData) => {

            setArticles(articlesData);
            setIsLoading(false);
        });
    }, [limitQuery]);

    useEffect(() => {

        setIsLoading(true);
        setSearchParams(() => {
            return {
                ...(topicQuery) && { topic: topicQuery },
                sort_by: sortByQuery,
                order: orderQuery,
                limit: limitQuery,
                p: pageQuery
            };
        });

        fetchArticles(topicQuery, sortByQuery, orderQuery, limitQuery, pageQuery)
        .then((articlesData) => {

            setArticles(articlesData);
            setIsLoading(false);
        });
    }, [pageQuery]);

    useEffect(() => {

        fetchTopics()
        .then((topicsData) => {
            setTopics(topicsData);
        });
    }, []);

    const handlePageChange = (totalArticles, pageChange) => {

        if(pageQuery <= Math.ceil(totalArticles / limitQuery)) {
            setPageQuery(+pageQuery + pageChange);
        }
    }

    let numOfArticles = 0;
    if (articles.length !== undefined) numOfArticles = articles.length;

    return isLoading
    ? <Loading />
    : (
        <section className="article-page">
            <h3 className="articles-heading">Displaying {numOfArticles} of {articles[0].total_count} Articles</h3>
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
                <div className="page-options-container">
                    <button id="left-page-button" disabled={pageQuery === 1} onClick={() => {
                        handlePageChange(articles[0].total_count, -1);
                    }}>←</button>
                    <p id="page-text">Page {pageQuery} / {Math.ceil(articles[0].total_count / limitQuery)}</p>
                    <button id="right-page-button" disabled={pageQuery === Math.ceil(articles[0].total_count / limitQuery)} onClick={() => {
                        handlePageChange(articles[0].total_count, 1);
                    }}>→</button>
                </div>
                <div className="limit-drop-down">
                    <label htmlFor="limit-select" id="limit-label">Results per page</label>
                    <select
                        id="limit-select"
                        value={limitQuery}
                        onChange={(event) => {
                            setLimitQuery(event.target.value);
                        }}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={articles[0].total_count}>All</option>
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