import { useEffect, useState } from 'react';
import { fetchArticles } from '../api';
import '../App.css';

const Home = () => {

    const [trendingArticles, setTrendingArticles] = useState([]);

    useEffect(() => {

        fetchArticles()
    }, []);
    return (
        <section>
            <h2 className="home-heading">Welcome to NC News</h2>
        </section>
    )
}

export default Home;