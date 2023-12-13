import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { type FunctionComponent } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HomeScreenProps,
  HomeStackProps,
  SignedInBottomTabProps,
} from "../../../../Router";
import HorizontalItemList from "../../../components/view/HorizontalItemList";
import { getAvatar } from "../../../util/api/avatar";
import useUser from "../../../util/hook/useUser";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const Main: FunctionComponent<HomeScreenProps<"Main">> = ({
  navigation: { navigate },
  route,
}) => {
  return (
    <SafeAreaView
      className="h-full w-full flex flex-col items-center justify-start px-4 pt-4"
      edges={["top"]}
    >
      <ScrollView className="w-full">
        <Header />
        <CurrentEvent />
        <HorizontalItemList
          title="Viral Shop"
          items={viralShopItems}
          onViewAll={() => {
            navigate("AllViralShopItems", {
              items: viralShopItems,
              title: "Viral Shop",
            });
          }}
          renderItem={(item) => (
            <ViralShopItemComponent {...item} enabled={false} />
          )}
        />
        <HorizontalItemList
          title="Favorite Menu"
          items={favoriteMenuItems}
          onViewAll={() => {
            navigate("AllFavoriteMenuItems", {
              items: favoriteMenuItems,
              title: "Favorite Menu",
            });
          }}
          renderItem={(item) => (
            <FavoriteMenuItemComponent {...item} enabled={false} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: FunctionComponent = () => {
  const user = useUser();

  return (
    <View
      className="mb-6 flex flex-row w-full items-center justify-between"
      style={{
        columnGap: 16,
      }}
    >
      <Image
        className="h-12 w-12 rounded-full"
        source={{
          uri: getAvatar(user!.name ?? "Eyub Yildirim"),
        }}
      />
      <View className="flex flex-col flex-1">
        <Text className="text-2xl font-bold">
          <Text className="text-2xl font-light">Hi,</Text>{" "}
          {user!.name.split(" ")[0] ?? "Eyub"}! 👋
        </Text>
        <Text className="text-sm text-gray-500">Good afternoon!</Text>
      </View>
      <MaterialCommunityIcons
        name="bell-badge-outline"
        size={32}
        color="black"
        className="ml-auto"
      />
    </View>
  );
};

const CurrentEvent = () => {
  return (
    <View
      className=" flex flex-col items-start bg-teal-400 p-6 rounded-2xl w-full"
      style={{
        rowGap: 16,
      }}
    >
      <View className="flex flex-col items-start">
        <Text className="text-2xl font-bold text-white flex-shrink">
          Caffein Time:
        </Text>
        <Text className="text-lg text-white flex-shrink">
          09:00 AM - 17:30 PM
        </Text>
      </View>
      <View className="bg-[#016a57] py-3 px-6 rounded-xl flex flex-row items-start">
        <Text className="text-white font-bold text-base">45% Discount</Text>
      </View>
    </View>
  );
};

export const ViralShopItemComponent: FunctionComponent<
  ViralShopItem & { enabled: boolean }
> = ({ rating, name, enabled, distance }) => {
  const { navigate } =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<HomeStackProps, "Main">,
        BottomTabNavigationProp<SignedInBottomTabProps>
      >
    >();
  return (
    <TouchableOpacity
      className="w-32 items-start justify-between flex flex-col"
      style={{
        rowGap: 4,
      }}
      disabled={!enabled}
      onPress={() => {
        navigate("ViralShopItem", {
          item: {
            name,
            rating,
            distance,
          },
        });
      }}
    >
      <View>
        <Image
          className="h-32 w-32 rounded-xl"
          source={{
            uri: getAvatar(name ?? "Eyub Yildirim"),
          }}
          resizeMode="stretch"
        />
        <Text className="text-black text-sm mt-2 font-semibold">{name}</Text>
        <View
          className="absolute top-2 left-2 flex flex-row bg-teal-900/50 px-[6px] py-1 rounded-md items-center"
          style={{
            columnGap: 2,
          }}
        >
          <MaterialCommunityIcons name="star" size={16} color="#fc9701" />
          <Text className="text-white font-semibold text-xs">{rating}</Text>
        </View>
      </View>
      <View
        className="flex flex-row items-center"
        style={{
          columnGap: 4,
        }}
      >
        <MaterialCommunityIcons name="map-marker" size={20} color="#107966" />
        <Text className="text-gray-400 text-[12px]">{distance} km</Text>
      </View>
    </TouchableOpacity>
  );
};

export const FavoriteMenuItemComponent: FunctionComponent<
  FavoriteMenuItem & { enabled: boolean }
> = ({ name, enabled, price }) => {
  const { navigate } =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<HomeStackProps, "Main">,
        BottomTabNavigationProp<SignedInBottomTabProps>
      >
    >();

  return (
    <TouchableOpacity
      className="w-32 items-start justify-between flex flex-col"
      style={{
        rowGap: 4,
      }}
      disabled={!enabled}
      onPress={() => {
        navigate("FavoriteMenuItem", {
          item: {
            name,
            price,
          },
        });
      }}
    >
      <View>
        <Image
          className="h-32 w-32 rounded-xl"
          source={{
            uri: getAvatar(name ?? "Eyub Yildirim"),
          }}
          resizeMode="stretch"
        />
        <Text className="text-black text-sm mt-2 font-semibold">{name}</Text>
      </View>
      <Text className="text-[#0b7763]">${price.toLocaleString()}</Text>
    </TouchableOpacity>
  );
};

export type ViralShopItem = {
  rating: number;
  name: string;
  distance: number;
};

export type FavoriteMenuItem = {
  name: string;
  price: number;
};

export const viralShopItems: ViralShopItem[] = [
  {
    rating: 4.7,
    name: "Caffein Sundari Vibes",
    distance: 3.1,
  },
  { rating: 4.5, name: "Caffein Vakansi", distance: 1.2 },
  { rating: 4.2, name: "Caffein Kedai", distance: 2.3 },
  { rating: 4.1, name: "Caffein Antwerp", distance: 4.3 },
];

export const favoriteMenuItems: FavoriteMenuItem[] = [
  {
    name: "Original Caffein Signature",
    price: 6.75,
  },
  {
    name: "Strawberry Cake Caffein",
    price: 7.55,
  },
  {
    name: "Blueberry Minty Caffein",
    price: 7.75,
  },
  {
    name: "Banana Sweet Caffein",
    price: 5.55,
  },
];

export default Main;
