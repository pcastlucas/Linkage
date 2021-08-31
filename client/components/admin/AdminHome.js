import React, { useContext } from "react";
import AdminDrawer from "./AdminDrawer";
import { Redirect } from "react-router";
import { objIsEmpty } from "../../utilities";
import userContext from "../../context/userContext";
import { Box } from "@material-ui/core";

const AdminHome = () => {
  const [user] = useContext(userContext);

  return (
    <Box display="flex">
      {!objIsEmpty(user) && <Redirect to="/home" />}
      <AdminDrawer />
      Admin Home
    </Box>
  );
};

export default AdminHome;
