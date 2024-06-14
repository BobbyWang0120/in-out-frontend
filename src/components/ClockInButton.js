import React, {useState, useEffect} from "react";
import { clockIn, checkClockInStatus  } from "../api/attendanceAPI";

const ClockInButton = ({onClick}) => {
  const [isClockedIn, setIsClockedIn] = useState(true);

  // On render, determine if already clocked in
  useEffect(() => {
    //Am I clocked in?
    async function checkClockIn() {
      const status = await checkClockInStatus();
      setIsClockedIn(status);
      console.log("Am I clocked in? " + status);
    }

    checkClockIn();
  }, [])

  const handleClick = () => {
    setIsClockedIn(!isClockedIn);
    console.log("Clocking in...");
    clockIn();
    onClick();
    console.log("Clocked in!");
  }

  return (
    <button onClick={handleClick} disabled={isClockedIn}>Clock In</button>
  )
}

export default ClockInButton;