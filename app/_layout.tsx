import ThemeProvider from "@/src/providers/theme-provider";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MyStore, { persistor } from "./redux/store/MyStore";
import AppContent from "./screens/appContent";

export default function RootLayout() {
  return (
    <Provider store={MyStore}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider>
          {/* <AuthProvider> */}
            <AppContent />
          {/* </AuthProvider> */}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}