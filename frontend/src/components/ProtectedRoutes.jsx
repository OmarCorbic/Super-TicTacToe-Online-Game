import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  });

  return <Outlet />;
};

export default ProtectedRoutes;
