import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Router from "./Router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          background: "#fff",
          border: "#fff",
          card: "#fff",
          notification: "#fff",
          primary: "#0070ff",
          text: "#000",
        },
      }}
    >
      <Router />
      <ExpoStatusBar style="auto" />
    </NavigationContainer>
  );
}
