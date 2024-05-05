import { Suspense } from "react";
import AppLoader from "./common/AppLoader";
import AppRouter from "./router";

function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <AppRouter />
    </Suspense>
  );
}

export default App;
