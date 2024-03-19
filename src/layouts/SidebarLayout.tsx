import Sidebar from "@/components/Shared/Sidebar";
import { Outlet } from "react-router-dom";
// import StarsCanvas from "@/components/StarBackground";

const SidebarLayout = () => {
    return (
        <div className="bg-image-main flex gap-4">
   
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default SidebarLayout;
