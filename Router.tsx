import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { HeaderBackButtonProps } from "@react-navigation/elements";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  StackHeaderInterpolationProps,
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { FunctionComponent } from "react";
import {
  Animated,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import AllFavoriteMenuItems from "./src/screens/SignedIn/Home/AllFavoriteMenuItems";
import AllViralShopItems from "./src/screens/SignedIn/Home/AllIViralShoptems";
import FavoriteMenuItemScreen from "./src/screens/SignedIn/Home/FavoriteMenuItem";
import Main, {
  FavoriteMenuItem,
  ViralShopItem,
} from "./src/screens/SignedIn/Home/Main";
import ViralShopItemScreen from "./src/screens/SignedIn/Home/ViralShopItem";
import ForgotPassword from "./src/screens/SignedOut/ForgotPassword";
import SignIn from "./src/screens/SignedOut/SignIn";
import SignUp from "./src/screens/SignedOut/SignUp";
import useUser from "./src/util/hook/useUser";
import RatingReview from "./src/screens/SignedIn/Home/RatingReview";

export type SignedOutStackProps = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type SignedInBottomTabProps = {
  Home: NavigatorScreenParams<HomeStackProps>;
  Profile: undefined;
};

export type HomeStackProps = {
  Main: undefined;
  AllFavoriteMenuItems: {
    title: string;
    items: FavoriteMenuItem[];
  };
  AllViralShopItems: {
    title: string;
    items: ViralShopItem[];
  };
  FavoriteMenuItem: {
    item: FavoriteMenuItem;
  };
  ViralShopItem: {
    item: ViralShopItem;
  };
  RatingReview: {
    rating: number;
  };
};

export type HomeScreenProps<T extends keyof HomeStackProps> =
  CompositeScreenProps<
    StackScreenProps<HomeStackProps, T>,
    BottomTabScreenProps<SignedInBottomTabProps>
  >;

const SignedOutStack = createStackNavigator<SignedOutStackProps>();
const HomeStack = createStackNavigator<HomeStackProps>();
const SignedInBottomTab = createBottomTabNavigator<SignedInBottomTabProps>();

const SignedOut: FunctionComponent = () => {
  return (
    <SignedOutStack.Navigator
      screenOptions={{
        headerTitleStyle: defaultHeaderTitleStyle,
        headerStyleInterpolator: defaultHeaderStyleInterpolator,
        headerLeft: defaultLeftHeader,
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
          headerTitle: "Sign-up Account",
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

const Home: FunctionComponent = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle: defaultHeaderTitleStyle,
        headerStyleInterpolator: defaultHeaderStyleInterpolator,
        headerLeft: defaultLeftHeader,
      }}
    >
      <HomeStack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AllFavoriteMenuItems"
        component={AllFavoriteMenuItems}
        options={({
          route: {
            params: { title },
          },
        }) => {
          return {
            headerTitle: title,
          };
        }}
      />
      <HomeStack.Screen
        name="AllViralShopItems"
        component={AllViralShopItems}
        options={({
          route: {
            params: { title },
          },
        }) => ({
          headerTitle: title,
        })}
      />
      <HomeStack.Screen
        name="FavoriteMenuItem"
        component={FavoriteMenuItemScreen}
        options={({
          route: {
            params: { item },
          },
        }) => ({
          headerTitle: item.name,
        })}
      />
      <HomeStack.Screen
        name="ViralShopItem"
        component={ViralShopItemScreen}
        options={({
          route: {
            params: { item },
          },
        }) => ({
          headerTitle: "",
          headerTransparent: true,
          headerLeft: ({ canGoBack, onPress }: HeaderBackButtonProps) =>
            canGoBack && (
              <TouchableOpacity onPress={onPress} className="ml-2">
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={28}
                  color="white"
                  backgroundColor="#fff0"
                />
              </TouchableOpacity>
            ),
        })}
      />
      <HomeStack.Screen
        name="RatingReview"
        component={RatingReview}
        options={({}) => ({
          headerTitle: "Rating & Reviews",
        })}
      />
    </HomeStack.Navigator>
  );
};

const SignedIn: FunctionComponent = () => {
  return (
    <SignedInBottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SignedInBottomTab.Screen
        name="Home"
        component={Home}
        options={({ route }) => {
          return {
            headerShown: false,
            tabBarStyle: {
              display:
                getFocusedRouteNameFromRoute(route) === "Main"
                  ? "flex"
                  : "none",
            },
            tabBarActiveTintColor: "#06c29e",
            tabBarInactiveTintColor: "#bfbfbf",
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="home"
                  size={size + 5}
                  color={color}
                />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  size={size + 5}
                  color={color}
                />
              ),
          };
        }}
      />
      <SignedInBottomTab.Screen
        name="Profile"
        component={View}
        options={{
          headerTitle: "Caffein Login",
          tabBarActiveTintColor: "#06c29e",
          tabBarInactiveTintColor: "#bfbfbf",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account"
                size={size + 5}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-outline"
                size={size + 5}
                color={color}
              />
            ),
        }}
      />
    </SignedInBottomTab.Navigator>
  );
};

const Router: FunctionComponent = () => {
  const user = useUser();

  if (!user) {
    return <SignedOut />;
  }

  return <SignedIn />;
};

export default Router;

const defaultHeaderStyleInterpolator = ({
  current,
  next,
}: StackHeaderInterpolationProps) => {
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
};

const defaultLeftHeader = ({ canGoBack, onPress }: HeaderBackButtonProps) =>
  canGoBack && (
    <TouchableOpacity onPress={onPress} className="ml-2">
      <MaterialCommunityIcons
        name="arrow-left"
        size={28}
        color="black"
        backgroundColor="#fff0"
      />
    </TouchableOpacity>
  );

const defaultHeaderTitleStyle: Animated.WithAnimatedValue<
  StyleProp<TextStyle>
> = {
  color: "black",
  fontSize: 20,
  fontWeight: "bold",
};
