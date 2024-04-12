import {useEffect, useState} from "react";
import Loading from "./Loading.jsx";
import UserCard from "./UserCard.jsx";
import {fetchUsers} from "../api.js";

const Users = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    setIsLoading(true);
    fetchUsers()
      .then((usersData) => {

        setUsers(usersData);
        setIsLoading(false);
      });
  }, []);

  return isLoading
    ? <Loading />
    : (
      <section>
        <h3>Showing {users.length} users</h3>
        <ul className="user-card-list">
          {users.map((user) => {
            return <UserCard key={user.username} user={user} />;
          })}
        </ul>
      </section>
    );
};

export default Users;
