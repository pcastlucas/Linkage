import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SubjectDropdown = (props) => {
  const { subjectID, setSubjectID } = props;
  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={subjectID}
          onChange={(evt) => setSubjectID(evt.target.value)}
          label="Subject"
        >
          <MenuItem value={1}>Computer Science</MenuItem>
          <MenuItem value={2}>Mathematics</MenuItem>
          <MenuItem value={3}>Science</MenuItem>
          <MenuItem value={4}>Social Studies</MenuItem>
          <MenuItem value={5}>English</MenuItem>
          <MenuItem value={6}>Physical Education</MenuItem>
          <MenuItem value={7}>Spanish</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SubjectDropdown;
