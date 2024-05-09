import { Suspense } from "react";
import AppLoader from "./common/AppLoader";
import AppRouter from "./router";
import LoadingContent from "./common/LoadingContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <LoadingContent loading={false} error={false}>
      <Suspense fallback={<AppLoader />}>
        <ToastContainer />
        <AppRouter />
      </Suspense>
    </LoadingContent>
  );
}

export default App;
