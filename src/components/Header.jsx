import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/User.jsx';

const Header = () => {

    const { loggedInUser } = useContext(UserContext);

    return (
        <header>
            <h1 id="main-heading">NC News</h1>
            <nav className="nav-bar">
                <Link to='/' id="home-nav-link">Home</Link>
                <Link to='/articles' id="articles-nav-link">Articles</Link>
                <Link to='/users' id="users-nav-link">Users</Link>
                <Link to={`/users/${loggedInUser.username}`} id="logged-in-user-nav-link">{loggedInUser.name}</Link>
            </nav>
        </header>
    )
}

export default Header;