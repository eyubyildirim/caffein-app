import React, {
  useEffect,
  type FunctionComponent,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackProps } from "../../../../Router";
import UserContext from "../../../util/context/user";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAvatar } from "../../../util/api/avatar";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const FavoriteMenuItem: FunctionComponent<
  StackScreenProps<HomeStackProps, "FavoriteMenuItem">
> = ({
  route: {
    params: { item },
  },
  navigation: { setOptions },
}) => {
  const { user, setUser } = useContext(UserContext);

  const [heartIcon, setHeartIcon] =
    useState<keyof typeof MaterialCommunityIcons.glyphMap>("heart-outline");

  const [selectedTemp, setSelectedTemp] = useState("iced");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [extraPrice, setExtraPrice] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    if (user.likedCoffees.includes(item.name)) setHeartIcon("heart");
    else setHeartIcon("heart-outline");
  }, [user]);

  useEffect(() => {
    setOptions({
      headerTitle: "",
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

                if (user.likedCoffees.includes(item.name)) {
                  setHeartIcon("heart-outline");
                  setUser({
                    ...user,
                    likedCoffees: user.likedCoffees.filter(
                      (shop) => shop !== item.name
                    ),
                  });
                } else {
                  setHeartIcon("heart");
                  setUser({
                    ...user,
                    likedCoffees: [...user.likedCoffees, item.name],
                  });
                }
              }}
            >
              <MaterialCommunityIcons
                name={heartIcon}
                size={28}
                color={heartIcon === "heart" ? "red" : "black"}
                backgroundColor="#fff0"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="share-variant"
                size={24}
                color="black"
                backgroundColor="#fff0"
              />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [heartIcon]);

  const { bottom } = useSafeAreaInsets();

  return (
    <View className="flex flex-col h-full w-full">
      <ScrollView
        className="h-full w-full p-4"
        contentInset={{
          bottom: 140,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          className="w-full aspect-[1.3] rounded-xl"
          source={{
            uri: getAvatar(item.name),
          }}
        />
        <View className="flex flex-col w-full">
          <Text className="text-2xl font-bold mt-4">{item.name}</Text>
          <Text className="text-lg text-[#0b7763] font-medium mt-1">
            ${item.price}
          </Text>
        </View>
        <View className="flex flex-row justify-end">
          <Counter count={count} setCount={setCount} />
        </View>
        <TemperatureSelector
          selected={selectedTemp}
          setSelected={setSelectedTemp}
          options={[
            { name: "iced", icon: "snowflake" },
            { name: "hot", icon: "coffee" },
          ]}
        />
        <View className="h-4" />
        <SizeSelector
          selected={selectedSize}
          setSelected={setSelectedSize}
          setExtraPrice={setExtraPrice}
          options={[
            { name: "small", icon: "size-s", extraPrice: -0.25 },
            { name: "medium", icon: "size-m", extraPrice: 0 },
            { name: "large", icon: "size-l", extraPrice: 0.5 },
          ]}
        />
      </ScrollView>
      <BlurView
        className="absolute w-full px-4 pt-6"
        style={{
          bottom: 0,
          paddingBottom: bottom,
          backgroundColor: "#fffa",
        }}
        intensity={6}
      >
        <TouchableOpacity
          className={`rounded-full h-16 bg-[#01bf9c] items-center justify-center w-full ${
            count * (extraPrice + item.price) === 0 && "opacity-40"
          }`}
          disabled={count * (extraPrice + item.price) === 0}
        >
          <Text className="text-white font-bold text-xl">
            Next - ${count * (extraPrice + item.price)}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const Counter: FunctionComponent<{
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}> = ({ count, setCount }) => {
  return (
    <View
      className="flex flex-row items-center justify-center rounded-full"
      style={{
        columnGap: 12,
      }}
    >
      <TouchableOpacity
        className={`p-2 rounded-md border border-[#01bf9c] ${
          count === 0 && "opacity-40"
        }`}
        disabled={count === 0}
        onPress={() => setCount((prev) => --prev)}
      >
        <MaterialCommunityIcons
          name="minus"
          size={24}
          color={"#01bf9c"}
          backgroundColor="#fff0"
        />
      </TouchableOpacity>
      <Text className="text-2xl font-semibold text-[#01bf9c]">{count}</Text>
      <TouchableOpacity
        className="p-2 rounded-md border border-[#01bf9c]"
        onPress={() => setCount((prev) => ++prev)}
      >
        <MaterialCommunityIcons
          name="plus"
          size={24}
          color="#01bf9c"
          backgroundColor="#fff0"
        />
      </TouchableOpacity>
    </View>
  );
};

const TemperatureSelector: FunctionComponent<{
  selected: string;
  setSelected: (s: string) => void;
  options: {
    name: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
  }[];
}> = ({ selected, setSelected, options }) => {
  return (
    <View
      className="flex flex-col"
      style={{
        rowGap: 8,
      }}
    >
      <Text className="font-bold text-xl">Available In</Text>
      <FlatList
        data={options}
        horizontal
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item: { name, icon } }) => {
          return (
            <TouchableOpacity
              className={`h-24 aspect-square items-center justify-center rounded-2xl flex flex-col border ${
                selected.toLowerCase() === name
                  ? "border-[#01bf9c] bg-[#cffff6]"
                  : "border-gray-400 bg-white"
              }`}
              onPress={() => setSelected(name)}
            >
              <MaterialCommunityIcons
                name={icon}
                size={48}
                color={selected.toLowerCase() === name ? "#01bf9c" : "#9ca3af"}
              />
              <Text
                className={`${
                  selected.toLowerCase() === name
                    ? "text-[#01bf9c]"
                    : "text-[#9ca3af]"
                }`}
              >
                {name[0].toUpperCase() + name.slice(1, name.length)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const SizeSelector: FunctionComponent<{
  selected: string;
  setSelected: (s: string) => void;
  setExtraPrice: Dispatch<SetStateAction<number>>;
  options: {
    name: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    extraPrice: number;
  }[];
}> = ({ selected, setSelected, options, setExtraPrice }) => {
  const [currentExtra, setCurrentExtra] = useState(0);

  return (
    <View
      className="flex flex-col"
      style={{
        rowGap: 8,
      }}
    >
      <Text className="font-bold text-xl">Size</Text>
      <FlatList
        data={options}
        horizontal
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item: { name, icon, extraPrice } }) => {
          return (
            <TouchableOpacity
              className={`h-32 aspect-square items-center justify-center rounded-2xl flex flex-col border ${
                selected.toLowerCase() === name
                  ? "border-[#01bf9c] bg-[#cffff6]"
                  : "border-gray-400 bg-white"
              }`}
              onPress={() => {
                setExtraPrice((prevExtra) => {
                  setCurrentExtra(extraPrice);
                  return prevExtra - currentExtra + extraPrice;
                });
                setSelected(name);
              }}
            >
              <MaterialCommunityIcons
                name={icon}
                size={48}
                color={selected.toLowerCase() === name ? "#01bf9c" : "#9ca3af"}
              />
              <Text
                className={`${
                  selected.toLowerCase() === name
                    ? "text-[#01bf9c]"
                    : "text-[#9ca3af]"
                }`}
              >
                {name[0].toUpperCase() + name.slice(1, name.length)}
              </Text>
              {extraPrice !== 0 && (
                <Text
                  className={`${
                    selected.toLowerCase() === name
                      ? "text-[#01bf9c]"
                      : "text-[#9ca3af]"
                  }`}
                >
                  {extraPrice > 0 ? `+ $${extraPrice}` : `- $${-extraPrice}`}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FavoriteMenuItem;
