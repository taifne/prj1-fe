import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarLayout from "@/layouts/SidebarLayout";
import Loading from "@/components/ui/Loading/Loading";

// Import các component
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const Home = lazy(() => import("@/pages/HomePage"));
const User = lazy(() => import("@/pages/User"));
const Role_Permissions = lazy(()=>import("@/pages/Role_Permission"));

const routes = [
    { path: "/", element: <Home /> },
    {path:"/user", element: <User />},
    {path:"/roles", element: <Role_Permissions />}

];

// Component ProtectedRouter
const ProtectedRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<MainLayout />}>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Suspense fallback={<Loading />}>
                                    {route.element}
                                </Suspense>
                            }
                        />
                    ))}
                </Route>
                <Route element={<SidebarLayout />}>
                    <Route path="/sidebar" />
                </Route>
                <Route
                    path="*"
                    element={<Navigate to={"/"} replace={true} />}
                />
            </Routes>
        </Suspense>
    );
};

export default ProtectedRouter;
