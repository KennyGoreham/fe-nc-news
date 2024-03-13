import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading.jsx';
import UserContext from '../contexts/User.jsx';
import { fetchUserByUsername } from '../api.js';

const SingleUser = () => {

    const { username } = useParams();
    const { setLoggedInUser } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);
        fetchUserByUsername(username)
        .then((user) => {
            
            setUser(user);
            setIsLoading(false);
        })
    }, [username]);


    return isLoading
    ? <Loading />
    : (
        <section className="user-info">
            <h3>{user.username}</h3>
            <img src={user.avatar_url} id="single-user-img"/>
            <button onClick={() => setLoggedInUser(user)} id="login-user-button">Continue as {user.username}</button>
        </section>
    )
}

export default SingleUser;