import { Outlet } from "react-router-dom";
import Header from "@/components/Shared/Header";
const MainLayout = () => {
    return (
        <div className="  ">
         <Header />
        
            <Outlet />
      
        </div>
    );
};

export default MainLayout;
