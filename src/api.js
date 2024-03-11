import axios from 'axios';

const newsApi = axios.create({
    baseURL: "https://nc-news-yemz.onrender.com/api"
});

export const fetchArticles = () => {

    return newsApi
    .get('/articles')
    .then(({ data: { articles } }) => {
        return articles;
    })
}

export const fetchArticleById = (article_id) => {

    return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
        return article;
    })
}