import { StackScreenProps } from "@react-navigation/stack";
import React, { type FunctionComponent } from "react";
import { Text, View } from "react-native";
import { HomeStackProps } from "../../../../Router";
import { FlatGrid } from "react-native-super-grid";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { getAvatar } from "../../../util/api/avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { SignedInBottomTabProps } from "../../../../Router";
import { StackNavigationProp } from "@react-navigation/stack";

const AllFavoriteMenuItems: FunctionComponent<
  StackScreenProps<HomeStackProps, "AllFavoriteMenuItems">
> = ({
  route: {
    params: { title, items },
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

export default AllFavoriteMenuItems;
