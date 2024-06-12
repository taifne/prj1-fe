import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRouter from "../src/routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "./store";
import GlobalDrawer from '@/components/Shared/drawer-views/container';
import { PersistGate } from "redux-persist/integration/react";
import GlobalModal from "@/components/Shared/modal-views/container";
import { ThemeProvider } from '@/components/Shared/theme-provider';
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
          <GlobalDrawer />
          <GlobalModal />
        </ThemeProvider>
      </Provider>

      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ inset: 20 }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0006",
            color: "#fff",
            backdropFilter: "blur(12px)",
            border: "1px solid #fff3",
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
