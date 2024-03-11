import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {

    return (
        <header>
            <h1 className="main-heading">NC News</h1>
            <nav className="nav-bar">
                <Link to='/'>Home</Link>
                <Link to='/articles'>Articles</Link>
                <Link to='/login'>Login</Link>
            </nav>
        </header>
    )
}

export default Header;