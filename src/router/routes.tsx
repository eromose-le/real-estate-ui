import { routeEnum } from "@/constants/RouteConstants";
import HomePage from "@/routes/homePage/homePage";
import {
  PublicRoutesLayout,
  ProtectRoutesLayout,
} from "@/routes/layout/layout";
import ListPage from "@/routes/listPage/listPage";
import Login from "@/routes/login/login";
import NewPostPage from "@/routes/newPostPage/newPostPage";
import ProfilePage from "@/routes/profilePage/profilePage";
import ProfileUpdatePage from "@/routes/profileUpdatePage/profileUpdatePage";
import Register from "@/routes/register/register";
import SinglePage from "@/routes/singlePage/singlePage";
import { ReactElement } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import AuthGuard from "./guard";
import RootErrorBoundary from "@/common/RootErrorBoundary";

type ExtendedRouteObject = RouteObject & {
  guarded?: boolean;
};

export const PublicRoutes: ExtendedRouteObject[] = [
  {
    path: routeEnum.HOME,
    element: <PublicRoutesLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: routeEnum.HOME,
        element: <HomePage />,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: routeEnum.LIST,
        element: <ListPage />,
        errorElement: <RootErrorBoundary />,
        // loader: listPageLoader,
      },
      {
        path: routeEnum.LIST_DETAIL,
        element: <SinglePage />,
        errorElement: <RootErrorBoundary />,
        // loader: singlePageLoader,
      },
      {
        path: routeEnum.LOGIN,
        element: <Login />,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: routeEnum.REGISTER,
        element: <Register />,
        errorElement: <RootErrorBoundary />,
      },
    ],
  },
];

export const ProtectedRoutes: ExtendedRouteObject[] = [
  {
    path: routeEnum.HOME,
    element: <ProtectRoutesLayout />,
    guarded: true,
    hasErrorBoundary: true,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: routeEnum.PROFILE,
        element: <ProfilePage />,
        errorElement: <RootErrorBoundary />,
        // loader: profilePageLoader,
      },
      {
        path: "/profile/update",
        element: <ProfileUpdatePage />,
        errorElement: <RootErrorBoundary />,
      },
      {
        path: "/add",
        element: <NewPostPage />,
        errorElement: <RootErrorBoundary />,
      },
    ],
  },
];

const allRoutes: ExtendedRouteObject[] = [
  ...PublicRoutes,
  ...ProtectedRoutes,
  {
    path: "*",
    element: <Navigate to={routeEnum.HOME} replace />,
  },
];

const appRoutes = allRoutes.map((route) => {
  if (route?.guarded && route?.element) {
    route.element = (
      <AuthGuard route={route} component={route.element as ReactElement} />
    );
  }

  return route;
});

export default appRoutes;
