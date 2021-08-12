import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const { data } = await axios.get("/api/user/all");
        setUsers(data);
        console.log(data);
    }, []);

    return (
        <div><UserList users={users} /></div>);
}

export default ManageUsers;