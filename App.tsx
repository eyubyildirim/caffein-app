import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Router from "./Router";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import UserContext from "./src/util/context/user";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState<
    | {
        name: "";
        email: "";
        phoneNumber: "";
        likedShops: [];
        likedCoffees: [];
      }
    | undefined
  >(undefined);

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
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <Router />
        <ExpoStatusBar style="auto" />
      </UserContext.Provider>
    </NavigationContainer>
  );
}
