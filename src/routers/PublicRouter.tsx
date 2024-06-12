import Loading from "@/components/ui/Loading/Loading";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Import các component
const BlankLayout = lazy(() => import("@/layouts/BlankLayout"));

const Register = lazy(() => import("@/pages/public/Register"));
const Introduction = lazy(() => import("@/pages/public/Introduction/index"));
const Login = lazy(() => import("@/pages/signin/page"));
const SignUp=lazy(() => import("@/pages/signup/index"));
// Định nghĩa mảng các route
const routes = [
    {
        path: "/introduction",
        element: <Introduction />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
];

const PublicRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route element={<BlankLayout />}>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Route>
                <Route
                    path="*"
                    element={<Navigate to="/login" replace={true} />}
                />
            </Routes>
        </Suspense>
    );
};

export default PublicRouter;
