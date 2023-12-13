import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { type FunctionComponent } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  HomeScreenProps,
  HomeStackProps,
  SignedInBottomTabProps,
} from "../../../../Router";
import { ViralShopItemComponent } from "./Main";
import { FlatGrid } from "react-native-super-grid";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { getAvatar } from "../../../util/api/avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AllViralShopItems: FunctionComponent<
  HomeScreenProps<"AllViralShopItems">
> = ({
  route: {
    params: { title, items },
    ...route
  },
}) => {
  const { navigate } =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<HomeStackProps, "Main">,
        BottomTabNavigationProp<SignedInBottomTabProps>
      >
    >();
  return (
    <FlatGrid
      className="-mt-8 flex flex-1 -mx-6"
      itemDimension={120}
      maxItemsPerRow={2}
      spacing={48}
      data={items}
      renderItem={({ item: { distance, name, rating } }) => (
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
              navigate("ViralShopItem", {
                item: {
                  name,
                  rating,
                  distance,
                },
              });
            }}
          >
            <View className="100%">
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
              <View
                className="absolute top-2 left-2 flex flex-row bg-teal-900/50 px-[6px] py-1 rounded-md items-center"
                style={{
                  columnGap: 2,
                }}
              >
                <MaterialCommunityIcons name="star" size={16} color="#fc9701" />
                <Text className="text-white font-semibold text-xs">
                  {rating}
                </Text>
              </View>
            </View>
            <View
              className="flex flex-row items-center"
              style={{
                columnGap: 4,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color="#107966"
              />
              <Text className="text-gray-400 text-[12px]">{distance} km</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default AllViralShopItems;
