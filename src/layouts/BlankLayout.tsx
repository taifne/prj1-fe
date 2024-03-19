
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <div className="bg-image-main min-h-screen overflow-x-hidden">
  

      <Outlet />
    </div>
  );
};

export default BlankLayout;
