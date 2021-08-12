import React, { useContext } from "react";
import AdminDrawer from "./AdminDrawer";
import { Redirect } from "react-router";
import { objIsEmpty } from "../../utilities";
import userContext from "../../context/userContext";

const AdminHome = () => {
  const [user, setUser] = useContext(userContext);

  return (
    <div>
      {!objIsEmpty(user) && <Redirect to="/home" />}
      <AdminDrawer />
      Admin Home
    </div>
  );
};

export default AdminHome;
