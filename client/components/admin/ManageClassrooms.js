import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassroomList from "./ClassroomList";
import ManageSingleClassroom from "./ManageSingleClassroom";
import { makeStyles } from "@material-ui/core";
import { objIsEmpty } from "../../utilities";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    display: "flex",
  },
}));

const ManageClassrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [singleClassroom, setSingleClassroom] = useState({});

  useEffect(async () => {
    await updateClassroomList();
  }, []);

  const manageSingleClassroom = async (classroomID) => {
    const { data } = await axios.get(`/api/classroom/${classroomID}`);
    console.log(data);
    setSingleClassroom(data);
    await updateClassroomList();
  };

  const updateClassroomList = async () => {
    const { data } = await axios.get("/api/classroom/all");
    setClassrooms(data);
    console.log(data);
  };

  return (
    <div>
      <div>
        {objIsEmpty(singleClassroom) ? (
          <ClassroomList
            classrooms={classrooms}
            manageSingleClassroom={manageSingleClassroom}
            updateClassroomList={updateClassroomList}
          />
        ) : (
          <ManageSingleClassroom
            setSingleClassroom={setSingleClassroom}
            classroom={singleClassroom}
            manageSingleClassroom={manageSingleClassroom}
            updateClassroomList={updateClassroomList}
          />
        )}
      </div>
    </div>
  );
};

export default ManageClassrooms;
