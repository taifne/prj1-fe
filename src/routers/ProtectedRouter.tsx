import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SidebarLayout from "@/layouts/SidebarLayout";
import Loading from "@/components/ui/Loading/Loading";

// Import các component
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const Home = lazy(() => import("@/pages/HomePage"));
const User = lazy(() => import("@/pages/User"));
const Role_Permissions = lazy(() => import("@/pages/Role_Permission"));
const CalendarEvent = lazy(() => import("@/pages//EventCalendar"));
const QuestionPage = lazy(() => import("@/pages/QuesionsList"));
const Discuss=lazy(()=>import("@/pages/Discus"));
const routes = [
    { path: "/", element: <Home /> },
    { path: "/management/users", element: <User /> },
    { path: "/management/roles", element: <Role_Permissions /> },
    { path: "/management/events", element: <Role_Permissions /> },
    { path: "/bulletin/events", element: <CalendarEvent /> },
    { path: "/bulletin/topqa", element: <QuestionPage /> },
    { path: "/bulletin/topqa/:id", element: <Discuss /> },
    { path: "/bulletin/news", element: <CalendarEvent /> }


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
