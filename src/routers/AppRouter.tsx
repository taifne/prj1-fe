import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import PublicRouter from "@/routers/PublicRouter";
import ProtectedRouter from "@/routers/ProtectedRouter";

const AppRouter = () => {
    //const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
      const isLoggedIn = true;

    return (
        <Routes>
            {isLoggedIn ? (
                <Route path="*" element={<ProtectedRouter />} />
            ) : (
                <Route path="*" element={<PublicRouter />} />
            )}
        </Routes>
    );
};

export default AppRouter;

