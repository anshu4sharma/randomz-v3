import { Outlet, Navigate } from "react-router-dom";
const authToken = localStorage.getItem("token");

export const ProtectedPages = () => {
  return authToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export const ProtectedAuthPages = () => {
  return authToken ? <Navigate to={"/sale"} /> : <Outlet />;
};

export const ProtectedAdminPages = () => {
  if (!authToken || authToken === "undefined") {
    return <Navigate to={"/admin/login"} />;
  } else {
    return <Outlet />;
  }
};

export const ProtectedAdminAuthPages = () => {
  return authToken ? <Navigate to={"/admin/allusers"} /> : <Outlet />;
};
