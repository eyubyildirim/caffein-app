import { createStackNavigator } from "@react-navigation/stack";
import { FunctionComponent } from "react";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import { Animated, Touchable, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ForgotPassword from "./src/screens/ForgotPassword";

type BaseStackProps = {
  SignedOut: undefined;
};

export type SignedOutStackProps = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const BaseStack = createStackNavigator<BaseStackProps>();
const SignedOutStack = createStackNavigator<SignedOutStackProps>();

const SignedOut: FunctionComponent = () => {
  return (
    <SignedOutStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff0",
        },
        headerTitleStyle: {
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
        },
        headerStyleInterpolator: ({ current, next }) => {
          const opacity = Animated.add(
            current.progress,
            next ? next.progress : 0
          ).interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 1, 0],
          });

          const translateXTitle = Animated.add(
            current.progress,
            next ? next.progress : 0
          ).interpolate({
            inputRange: [0, 1, 2],
            outputRange: [150, 0, -150],
          });
          const translateXLeftButton = Animated.add(
            current.progress,
            next ? next.progress : 0
          ).interpolate({
            inputRange: [0, 1, 2],
            outputRange: [300, 0, -300],
          });

          return {
            titleStyle: {
              opacity: opacity,
              transform: [{ translateX: translateXTitle }],
            },
            leftButtonStyle: {
              opacity,
              transform: [{ translateX: translateXLeftButton }],
            },
            rightButtonStyle: { opacity },
            backgroundStyle: { opacity },
          };
        },
        headerLeft: ({ canGoBack, onPress }) =>
          canGoBack && (
            <TouchableOpacity onPress={onPress} className="ml-2">
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color="black"
                backgroundColor="#fff0"
              />
            </TouchableOpacity>
          ),
      }}
    >
      <SignedOutStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: "Caffein Login",
        }}
      />
      <SignedOutStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: "Sign up Account",
        }}
      />
      <SignedOutStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTitle: "Caffein Login",
        }}
      />
    </SignedOutStack.Navigator>
  );
};

const Router: FunctionComponent = () => {
  return (
    <BaseStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BaseStack.Screen name="SignedOut" component={SignedOut} />
    </BaseStack.Navigator>
  );
};

export default Router;
