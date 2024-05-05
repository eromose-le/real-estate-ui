import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import { routeEnum } from "./constants/RouteConstants";
import {
  PublicRoutesLayout,
  ProtectRoutesLayout,
} from "@/routes/layout/layout";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";

function App() {
  const router = createBrowserRouter([
    {
      path: routeEnum.HOME,
      element: <PublicRoutesLayout />,
      children: [
        {
          path: routeEnum.HOME,
          element: <HomePage />,
        },
        {
          path: routeEnum.LIST,
          element: <ListPage />,
          // loader: listPageLoader,
        },
        {
          path: routeEnum.LIST_DETAIL,
          element: <SinglePage />,
          // loader: singlePageLoader,
        },
        {
          path: routeEnum.LOGIN,
          element: <Login />,
        },
        {
          path: routeEnum.REGISTER,
          element: <Register />,
        },
      ],
    },
    {
      path: routeEnum.HOME,
      element: <ProtectRoutesLayout />,
      children: [
        {
          path: routeEnum.PROFILE,
          element: <ProfilePage />,
          // loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
