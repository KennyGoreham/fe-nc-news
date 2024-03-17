import { Link } from 'react-router-dom';

const UserCard = (props) => {

    const { user } = props;

    return (
        <div className="user-card-info">
            <img src={user.avatar_url} id="user-card-img"/>
            <Link to={`/users/${user.username}`} id="username-link"><h4 id="user-card-username">{user.username}</h4></Link>
        </div>
    )
}

export default UserCard;