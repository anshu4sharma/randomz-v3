import { useState } from "react";
import SaleNavbar from "../components/SaleNavbar";
import Sidebar from "../components/Sidebar";
import LayoutAdmin from "./LayoutAdmin";
import { Outlet } from "react-router-dom";
const AdminDashboard = () => {
  const [show, setshow] = useState(false);
  return (
    <LayoutAdmin>
      <SaleNavbar isAdminPage />
      <div className="flex flex-row justify-between">
        <Sidebar setShow={setshow} show={show} />
        <Outlet />
      </div>
    </LayoutAdmin>
  );
};

export default AdminDashboard;
