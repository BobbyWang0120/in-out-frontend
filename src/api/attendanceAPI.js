const getUserAttendance = async (token, _id) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance?user=${_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
            }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);

        return data;
    } catch (error) {
        console.error("Failed to get attendance:", error.message);
        throw new Error("Failed to get attendance. Please try again later.");
    }
}

export { getUserAttendance };