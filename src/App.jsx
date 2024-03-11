import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Articles from './components/Articles.jsx';
import SingleArticle from './components/SingleArticle.jsx';

const App = () => {

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />
      </Routes>
    </>
  )
}

export default App;