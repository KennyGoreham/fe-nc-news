import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/User.jsx';

const Header = () => {

    const { loggedInUser } = useContext(UserContext);

    return (
        <header className="header-container">
            <Link to='/' id="main-heading-link"><h1 id="main-heading">NC News</h1></Link>
            <nav className="nav-bar">
                <Link to='/' id="home-nav-link">Home</Link>
                <Link to='/articles' id="articles-nav-link">Articles</Link>
                <Link to='/users' id="users-nav-link">Users</Link>
            </nav>
            <Link to={`/users/${loggedInUser.username}`} id="logged-in-user-nav-link">Currently logged in as: {loggedInUser.name}</Link>
        </header>
    )
}

export default Header;