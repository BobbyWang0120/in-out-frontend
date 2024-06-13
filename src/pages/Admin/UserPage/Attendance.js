import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditingList from "../../../components/EditingList";
import {
  getUserAttendance,
  addAttendanceRecord,
  deleteAttendanceRecord,
  editAttendanceRecord,
} from "../../../api/attendanceAPI";
import useUserData from "../../../hooks/useUserData";
import useList from "../../../hooks/useList";

const AdminUserAttendancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // Validators
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);
  useEffect(() => {
    if (role !== "admin") navigate("/access-denied");
  }, [role, navigate]);

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useUserData(token, id);
  const {
    list,
    loading: listLoading,
    error: listError,
    loadList,
  } = useList(token, id, getUserAttendance);

  let title;
  let userContent;
  let pageContent;
  let backLink;

  //handle adding a new attendance
  const handleAdd = async (newItem) => {
    console.log("Tried to add new item.");
    console.table(await addAttendanceRecord(token, id, newItem));
    loadList();
  };
  const handleEdit = async (newItem) => {
    console.log(`Tried to edit item: ${newItem._id}`);
    console.table(await editAttendanceRecord(token, newItem));
    loadList();
  };
  const handleDelete = async (item) => {
    console.log(`Tried to delete item: ${item._id}`);
    console.table(await deleteAttendanceRecord(token, item._id));
    loadList();
  };

  if (userLoading) {
    userContent = <p>Loading...</p>;
  } else if (userError) {
    userContent = <p>{userError}</p>;
  } else {
    title = <h1>Attendance Record for {user.name}</h1>;
    userContent = (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }

  if (listLoading) pageContent = <p>Loading...</p>;
  else if (listError) {
    title = <h1>Error</h1>;
    pageContent = <p>{listError}</p>;
    backLink = (
      <p>
        <Link to="/admin">Back to dashboard</Link>
      </p>
    );
  } else {
    pageContent = (
      <EditingList
        list={list}
        fields={{ date: "datetime-local", isClockedIn: "checkbox" }}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
    backLink = (
      <p>
        <Link to={`/admin/users/${id}`}>Back to user</Link>
      </p>
    );
  }

  return (
    <div>
      {title}
      {userContent}
      {pageContent}
      {backLink}
    </div>
  );
};

export default AdminUserAttendancePage;
