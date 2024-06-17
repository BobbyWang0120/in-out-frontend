import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        <Link to="/">Go back to Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;