import axios from 'axios';

const newsApi = axios.create({
    baseURL: "https://nc-news-yemz.onrender.com/api"
});

export const fetchArticles = () => {

    return newsApi
    .get('/articles')
    .then(({ data: { articles } }) => {
        return articles;
    });
}

export const fetchArticleById = (article_id) => {

    return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
        return article;
    });
}

export const fetchCommentsByArticleId = (article_id) => {

    return newsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
        return comments;
    });
}

export const patchArticleById = (article_id, increment) => {

    const patchBody = {
        inc_votes: increment
    };

    return newsApi
    .patch(`/articles/${article_id}`, patchBody)
    .then(({ data: { article } }) => {
        return article;
    });
}