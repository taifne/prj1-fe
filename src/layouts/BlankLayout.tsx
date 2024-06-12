
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const BlankLayout = () => {
  return (
    <div className="bg-image-main min-h-screen overflow-x-hidden">
            <ToastContainer />
  

      <Outlet />
    </div>
  );
};

export default BlankLayout;
