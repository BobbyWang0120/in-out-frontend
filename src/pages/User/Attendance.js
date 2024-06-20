import React from "react";
import { useNavigate } from "react-router-dom";
import useList from "../../hooks/useList";
import ViewingList from "../../components/ViewingList";
import { getUserAttendance } from "../../api/attendanceAPI";

const UserAttendancePage = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  
  const {
    list,
    loading,
    error,
  } = useList(null, getUserAttendance);

  let listContent;
  let backLink;

  if (loading) listContent = <p>Loading...</p>;
  else if (error) { listContent = <p>{error.message}</p>; }
  else listContent = ( 
    <ViewingList list={list} fields={{ date: "datetime-local", isClockedIn: "checkbox" }} />
  )
  backLink = <button onClick={() => navigate("/")}>Back to home</button>

  return (
    <div>
      <h1>Attendance Record for {name}</h1>
      {listContent}
      {backLink}
    </div>
  )
} 

export default UserAttendancePage;