import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/User.jsx';
import CommentCard from './CommentCard.jsx';
import Loading from './Loading.jsx';
import Error from './Error.jsx';
import { fetchUserByUsername, fetchCommentsByUsername } from '../api.js';

const SingleUser = () => {

    const { username } = useParams();
    const { setLoggedInUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userComments, setUserComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorInfo, setErrorInfo] = useState({});

    useEffect(() => {

        setIsLoading(true);
        fetchUserByUsername(username)
        .then((user) => {
            
            setUser(user);
            return fetchCommentsByUsername(username)
        })
        .then((comments) => {

            setUserComments(comments)
            console.log(userComments);
            setIsLoading(false);
        })
        .catch((err) => {

            setErrorInfo({
                ...errorInfo,
                status: err.response.status,
                message: err.response.data.msg
            });
        });
    }, [username]);


    if(Object.keys(errorInfo).length !== 0) return <Error status={errorInfo.status} message={errorInfo.message} />

    return isLoading
    ? <Loading />
    : (
        <>
            <section className="user-info">
                <h3>{user.username}</h3>
                <img src={user.avatar_url} id="single-user-img"/>
                <button onClick={() => {
                    setLoggedInUser(user)
                    navigate('/');
                    }} id="login-user-button">Continue as {user.username}</button>
            </section>
            <section className="user-comment-history">
                <h4>Recent activity</h4>
                {userComments.map((comment) => {
                    return <CommentCard key={comment.comment_id} comment={comment} />
                })}
            </section>
        </>
    )
}

export default SingleUser;