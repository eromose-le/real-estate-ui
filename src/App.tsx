import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import { routeEnum } from "./constants/RouteConstants";

function App() {
  const router = createBrowserRouter([
    {
      path: routeEnum.HOME,
      element: <Layout />,
      children: [
        {
          path: routeEnum.HOME,
          element: <HomePage />,
        },
        {
          path: routeEnum.LIST,
          element: <ListPage />,
        },
        {
          path: routeEnum.LIST_DETAIL,
          element: <SinglePage />,
        },
        {
          path: routeEnum.PROFILE,
          element: <ProfilePage />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
