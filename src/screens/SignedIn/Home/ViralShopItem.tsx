import React, {
  useEffect,
  type FunctionComponent,
  useState,
  useContext,
} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { HomeStackProps, SignedInBottomTabProps } from "../../../../Router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useUser from "../../../util/hook/useUser";
import UserContext from "../../../util/context/user";
import { getAvatar } from "../../../util/api/avatar";
import { FlatGrid } from "react-native-super-grid";
import { favoriteMenuItems } from "./Main";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const ViralShopItem: FunctionComponent<
  StackScreenProps<HomeStackProps, "ViralShopItem">
> = ({
  navigation: { setOptions },
  route: {
    params: { item },
  },
}) => {
  const { user, setUser } = useContext(UserContext);

  const [heartIcon, setHeartIcon] =
    useState<keyof typeof MaterialCommunityIcons.glyphMap>("heart-outline");

  const [selectedItem, setSelectedItem] = useState("Coffee");

  useEffect(() => {
    if (!user) return;

    if (user.likedShops.includes(item.name)) setHeartIcon("heart");
    else setHeartIcon("heart-outline");
  }, [user]);

  useEffect(() => {
    setOptions({
      headerRight: ({}) => {
        return (
          <View
            className="mr-2 flex flex-row"
            style={{
              columnGap: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (!user) return;

                if (user.likedShops.includes(item.name)) {
                  setHeartIcon("heart-outline");
                  setUser({
                    ...user,
                    likedShops: user.likedShops.filter(
                      (shop) => shop !== item.name
                    ),
                  });
                } else {
                  setHeartIcon("heart");
                  setUser({
                    ...user,
                    likedShops: [...user.likedShops, item.name],
                  });
                }
              }}
            >
              <MaterialCommunityIcons
                name={heartIcon}
                size={32}
                color={heartIcon === "heart" ? "red" : "white"}
                backgroundColor="#fff0"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="share-variant"
                size={28}
                color="white"
                backgroundColor="#fff0"
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [heartIcon]);

  return (
    <View className="h-full w-full flex flex-col items-center justify-start">
      <Image
        className="w-full h-1/3 rounded-b-2xl"
        source={{
          uri: getAvatar(item.name),
        }}
      />
      <ScrollView className="w-full px-4 pt-4">
        <Rating rating={item.rating} name={item.name} />
        <View className="h-4" />
        <Distance distance={item.distance} />
        <View className="h-4" />
        <Promotions />
        <View className="h-4" />
        <Categories
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <View className="h-4" />
        <CoffeeItems />
      </ScrollView>
    </View>
  );
};

const Rating: FunctionComponent<{ rating: number; name: string }> = ({
  rating,
  name,
}) => {
  const { navigate } =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<HomeStackProps, "Main">,
        BottomTabNavigationProp<SignedInBottomTabProps>
      >
    >();

  return (
    <TouchableOpacity
      onPress={() => {
        navigate("RatingReview", { rating: rating });
      }}
      className="flex flex-row items-center"
    >
      <View className="flex flex-col flex-1">
        <Text className="text-2xl font-bold">{name}</Text>
        <View
          className="flex flex-row items-center"
          style={{
            columnGap: 12,
          }}
        >
          <MaterialCommunityIcons
            name="star"
            size={32}
            color="#fc9701"
            backgroundColor="#fff0"
          />
          <Text className="text-xl font-semibold">{rating}</Text>
          <Text className="text-gray-400">(5.4k reviews)</Text>
        </View>
      </View>
      <MaterialIcons
        name="arrow-forward-ios"
        size={24}
        color="#b1b1b1"
        backgroundColor="#fff0"
      />
    </TouchableOpacity>
  );
};

const Distance: FunctionComponent<{ distance: number }> = ({ distance }) => {
  return (
    <View
      className="rounded-lg shadow-md bg-white w-full p-4 flex flex-row items-center"
      style={{
        columnGap: 16,
      }}
    >
      <MaterialCommunityIcons
        name="map-marker"
        size={36}
        color="#00d895"
        backgroundColor="#fff0"
      />
      <Text className="text-lg font-semibold">{distance} km</Text>
      <View className="bg-[#f0f8f6] rounded-md p-2">
        <Text className="text-[#027f68] text-sm">Pick-up and delivery</Text>
      </View>
    </View>
  );
};

const Promotions: FunctionComponent = () => {
  return (
    <View
      className="rounded-lg shadow-md bg-white w-full p-4 flex flex-row items-center"
      style={{
        columnGap: 16,
      }}
    >
      <MaterialCommunityIcons
        name="percent"
        size={36}
        color="#00d895"
        backgroundColor="#fff0"
      />
      <View
        className="flex flex-col flex-shrink"
        style={{
          rowGap: 4,
        }}
      >
        <Text className="text-xl font-bold">6 promotions are available</Text>
        <Text className="text-gray-400 text-sm overflow-clip">
          Use this promo to get a discount on purchasing Caffein products
        </Text>
      </View>
    </View>
  );
};

const Categories: FunctionComponent<{
  selectedItem: string;
  setSelectedItem: (newS: string) => void;
}> = ({ selectedItem, setSelectedItem }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={["Coffee", "Cake", "Sandwich"]}
      ItemSeparatorComponent={() => <View className="w-2" />}
      renderItem={({ item }) =>
        item !== selectedItem ? (
          <TouchableOpacity
            className="rounded-full border bg-white py-2 px-8 border-gray-300"
            onPress={() => setSelectedItem(item)}
          >
            <Text className="font-bold text-xl text-[#323232]">{item}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="rounded-full border bg-[#00d895] py-2 px-8 border-[#00d895]">
            <Text className="font-bold text-xl text-white">{item}</Text>
          </TouchableOpacity>
        )
      }
    ></FlatList>
  );
};

const CoffeeItems: FunctionComponent = () => {
  const { navigate } =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<HomeStackProps, "Main">,
        BottomTabNavigationProp<SignedInBottomTabProps>
      >
    >();
  return (
    <FlatGrid
      className="-mt-9 flex flex-1 -mx-5"
      itemDimension={120}
      maxItemsPerRow={2}
      spacing={36}
      // horizontal
      scrollEnabled={false}
      data={favoriteMenuItems}
      renderItem={({ item: { price, name } }) => (
        <View
          className="flex flex-col items-center justify-start flex-1 w-full"
          key={name}
        >
          <TouchableOpacity
            className="w-full items-start justify-between flex flex-col"
            style={{
              rowGap: 4,
            }}
            onPress={() => {
              navigate("FavoriteMenuItem", {
                item: {
                  name,
                  price,
                },
              });
            }}
          >
            <View className="">
              <Image
                className="w-[100%] aspect-square rounded-xl"
                source={{
                  uri: getAvatar(name ?? "Eyub Yildirim"),
                }}
                resizeMode="stretch"
              />
              <Text className="text-black text-sm mt-2 font-semibold">
                {name}
              </Text>
            </View>
            <Text className="text-[#0b7763]">${price.toLocaleString()}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default ViralShopItem;
