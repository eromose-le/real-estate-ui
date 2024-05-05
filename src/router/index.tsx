import { RouterProvider, createBrowserRouter } from "react-router-dom";

import appRoutes from "./routes";
import AppLoader from "@/common/AppLoader";

const router = createBrowserRouter(appRoutes);

function AppRouter() {
  return <RouterProvider router={router} fallbackElement={<AppLoader />} />;
}

export default AppRouter;
