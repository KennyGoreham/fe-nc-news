import axios from 'axios';

const newsApi = axios.create({
    baseURL: "https://nc-news-yemz.onrender.com/api"
});

export const fetchArticles = (topicQuery = "", sortByQuery = "", orderQuery = "", limitQuery = 10, pageQuery = 1) => {

    const params = { 
        topic: topicQuery,
        sort_by: sortByQuery,
        order: orderQuery,
        limit: limitQuery,
        p: pageQuery 
    };

    return newsApi
    .get('/articles', { params })
    .then(({ data: { articles } }) => {
        return articles;
    });
}

export const fetchTopics = () => {

    return newsApi
    .get('/topics')
    .then(({ data: { topics } }) => {
        return topics;
    });
}

export const fetchArticleById = (article_id) => {

    return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
        return article;
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

export const fetchCommentsByArticleId = (article_id) => {

    return newsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
        return comments;
    });
}

export const postCommentByArticleId = (article_id, commentBody, user) => {
    
    const postBody = {
        username: user.username,
        body: commentBody
    }

    return newsApi
    .post(`/articles/${article_id}/comments`, postBody)
    .then(({ data: { comment } }) => {
        return comment;
    });
}

export const patchCommentByCommentId = (comment_id, increment) => {

    const patchBody = {
        inc_votes: increment
    }

    return newsApi
    .patch(`/comments/${comment_id}`, patchBody)
    .then(({ data: { comment } }) => {
        return comment;
    });
}

export const deleteCommentByCommentId = (comment_id) => {

    return newsApi
    .delete(`/comments/${comment_id}`)
}

export const fetchUsers = () => {

    return newsApi
    .get('/users')
    .then(({ data: { users } }) => {
        return users;
    })
}

export const fetchUserByUsername = (username) => {

    return newsApi
    .get(`/users/${username}`)
    .then(({ data: { user } }) => {
        return user;
    });
}

export const fetchCommentsByUsername = (username) => {

    return newsApi
    .get(`/users/${username}/comments`)
    .then(({ data: { comments } }) => {
        return comments;
    });
}