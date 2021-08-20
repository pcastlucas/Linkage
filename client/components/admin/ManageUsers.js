import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";
import { objIsEmpty } from "../../utilities";
import ManageSingleUser from "./ManageSingleUser";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState({});

  useEffect(async () => {
    const { data } = await axios.get("/api/user/all");
    setUsers(data);
    console.log(data);
  }, []);

  const activateUser = async (userID) => {
    const { data } = await axios.post("/api/user/activate", {
      userID,
    });
    updateUser(userID);
  };

  const deactivateUser = async (userID) => {
    const { data } = await axios.post("/api/user/deactivate", {
      userID,
    });
    updateUser(userID);
  };

  const updateUser = async (userID) => {
    const { data } = await axios.get(`/api/user/${userID}`);
    setUsers((prevState) =>
      prevState.map((user) => {
        if (user.UserID === userID) {
          user = data;
        }
        return user;
      })
    );
  };

  const manageSingleUser = async (userID) => {
    if (userID === -1) {
      setSingleUser({});
    } else {
      const { data } = await axios.get(`/api/user/${userID}`);
      setSingleUser(data);
    }
  };

  return (
    <div>
      {objIsEmpty(singleUser) ? (
        <UserList
          users={users}
          activateUser={activateUser}
          deactivateUser={deactivateUser}
          manageSingleUser={manageSingleUser}
        />
      ) : (
        <ManageSingleUser
          user={singleUser}
          manageSingleUser={manageSingleUser}
          updateUser={updateUser}
        />
      )}
    </div>
  );
};

export default ManageUsers;
