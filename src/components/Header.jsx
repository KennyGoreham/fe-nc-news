import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/User.jsx';

const Header = () => {

    const { loggedInUser } = useContext(UserContext);

    return (
        <header>
            <h1 className="main-heading">NC News</h1>
            <nav className="nav-bar">
                <Link to='/'>Home</Link>
                <Link to='/articles'>Articles</Link>
                <Link to='/users'>Users</Link>
                <Link to={`/users/${loggedInUser.username}`}>{loggedInUser.name}</Link>
            </nav>
        </header>
    )
}

export default Header;