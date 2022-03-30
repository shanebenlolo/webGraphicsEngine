import React, { useState } from "react";
import { getAllUsers } from "../../apis/users";
import "./userList.css";

export function UserList() {
  const [users, setUsers] = useState([]);

  const setUserState = async () => {
    const userList = await getAllUsers();
    setUsers(userList);
  };

  const userList = users.map((user) => (
    <div className="user-info">
      <div className="user-name">{user.name}</div>
      <div className="user-email">{user.email}</div>
    </div>
  ));

  return (
    <>
      <main>
        <div>
          <span>{userList}</span>
        </div>
        <div className="buttonContainer">
          <button className="button" onClick={() => setUserState()}>
            fetch users
          </button>
        </div>
      </main>
    </>
  );
}
