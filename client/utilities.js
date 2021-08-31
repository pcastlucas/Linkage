const objIsEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const getRoleName = (roleID) => {
  switch (roleID) {
    case 1:
      return "Administrator";
    case 2:
      return "Teacher";
    case 3:
      return "Student";
    case 4:
      return "Parent";
  }
};

const getSubjectName = (subjectID) => {
  switch (subjectID) {
    case 1:
      return "Computer Science";
    case 2:
      return "Mathematics";
    case 3:
      return "Science";
    case 4:
      return "Social Studies";
    case 5:
      return "English";
    case 6:
      return "Physical Education";
    case 7:
      return "Spanish";
  }
};

const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, []);
};

export { objIsEmpty, getRoleName, getSubjectName, groupBy };
