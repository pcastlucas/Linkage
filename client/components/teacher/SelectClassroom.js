import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { getSubjectName } from "../../utilities";

const SelectClassroom = (props) => {
    const { classrooms, setClassroomID, classroomID } = props;

    return (
        <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Classroom</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={classroomID}
                onChange={(evt) => setClassroomID(evt.target.value)}
                label="Classroom"
            >
                {classrooms.map((classroom, idx) => {
                    const clsrm = classroom[0] ? classroom[0] : classroom;
                    return (
                        <MenuItem key={idx} value={clsrm.ClassroomID}>{getSubjectName(clsrm.SubjectID)} - {clsrm.RoomNumber}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
}

export default SelectClassroom;