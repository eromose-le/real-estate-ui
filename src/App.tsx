import { Suspense } from "react";
import AppLoader from "./common/AppLoader";
import AppRouter from "./router";
import LoadingContent from "./common/LoadingContent";

function App() {
  return (
    <LoadingContent loading={false} error={false}>
      <Suspense fallback={<AppLoader />}>
        <AppRouter />
      </Suspense>
    </LoadingContent>
  );
}

export default App;
