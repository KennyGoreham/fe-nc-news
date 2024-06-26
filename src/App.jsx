import {useState} from "react";
import {Routes, Route} from "react-router-dom";
import Articles from "./components/Articles.jsx";
import Error from "./components/Error.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import SingleArticle from "./components/SingleArticle.jsx";
import SingleUser from "./components/SingleUser.jsx";
import UserContext from "./contexts/User.jsx";
import Users from "./components/Users.jsx";
import "./App.css";

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState({
    username: "weegembump",
    name: "Gemma Bump",
    avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/7/7e/MrMen-Bump.png/revision/latest?cb=20180123225553",
  });

  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:username' element={<SingleUser />} />
        <Route path='/*' element={<Error status={404} message={"Resource not found."}/>} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
