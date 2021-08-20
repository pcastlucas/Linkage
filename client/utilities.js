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

export { objIsEmpty, getRoleName };
