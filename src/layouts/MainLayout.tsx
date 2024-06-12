import { Outlet } from "react-router-dom";
import Header from "@/components/Shared/Header";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
    return (
        <div className=" ">
         <Header />
         
         <ToastContainer />

        
            <Outlet  />
      
        </div>
    );
};

export default MainLayout;
