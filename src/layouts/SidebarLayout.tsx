import Sidebar from "@/components/Shared/Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import StarsCanvas from "@/components/StarBackground";

const SidebarLayout = () => {
    return (
        <div className="bg-image-main flex gap-4">
            <ToastContainer />
   
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default SidebarLayout;
