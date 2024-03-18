import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchArticles, fetchTopics } from '../api.js';
import ArticleCard from './ArticleCard.jsx';
import Loading from './Loading.jsx';
import Error from './Error.jsx';

const Articles = () => {

    const [searchParams, setSearchParams] = useSearchParams({});

    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(searchParams.get("p") || 1);
    const [errorInfo, setErrorInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [limitQuery, setLimitQuery] = useState(searchParams.get("limit") || 10);
    const [orderQuery, setOrderQuery] = useState(searchParams.get("order") || "desc");
    const [sortByQuery, setSortByQuery] = useState(searchParams.get("sort_by") || "created_at");
    const [topicQuery, setTopicQuery] = useState(searchParams.get("topic") || "");
    const [topics, setTopics] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {

        fetchArticles(topicQuery, sortByQuery, orderQuery, limitQuery, currentPage)
        .then(({ articles, totalPages}) => {
            
            setArticles(articles);
            setTotalPages(totalPages);
            setSearchParams({
                ...searchParams,
                ...(topicQuery) && { topic: topicQuery },
                sort_by: sortByQuery,
                order: orderQuery,
                limit: limitQuery,
                p: currentPage
            });
            setIsLoading(false);
        })
        .catch((err) => {

            setErrorInfo({
                ...errorInfo,
                status: err.response.status,
                message: err.response.data.msg
            });
        })
    }, [topicQuery, sortByQuery, orderQuery, limitQuery, currentPage]);

    useEffect(() => {

        fetchTopics()
        .then((topicsData) => {
            setTopics(topicsData);
        });
    }, []);

    const handlePageChange = (pageIncrement) => {
        setCurrentPage(currentPage + pageIncrement);
    }

    if(Object.keys(errorInfo).length !== 0) return <Error status={errorInfo.status} message={errorInfo.message}/>

    return isLoading
    ? <Loading />
    : (
        <section className="article-page">
            <h3 className="articles-heading">Displaying {articles.length || 0} of {articles[0].total_count || 0} articles for {topicQuery || "all topics"}</h3>
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
                <div className="page-limit-container">
                    <div className="page-options-container">
                        <button id="left-page-button" disabled={currentPage === 1} onClick={() => {
                            handlePageChange(-1);
                        }}>←</button>
                        <p id="page-text">Page {currentPage} / {totalPages}</p>
                        <button id="right-page-button" disabled={currentPage === totalPages} onClick={() => {
                            handlePageChange(1);
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
            </div>
            <ul className="article-card-list">
                {articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article} setTopicQuery={setTopicQuery} />
                })}
            </ul>
            <div className="bottom-page-options-container">
                <button id="left-page-button" disabled={currentPage === 1} onClick={() => {
                    handlePageChange(-1);
                }}>←</button>
                <p id="page-text">Page {currentPage} / {totalPages}</p>
                <button id="right-page-button" disabled={currentPage === totalPages} onClick={() => {
                    handlePageChange(1);
                }}>→</button>
            </div>
        </section>
    )
}

export default Articles;