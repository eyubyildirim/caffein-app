import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, type FunctionComponent } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { HomeScreenProps } from "../../../../Router";
import { getAvatar } from "../../../util/api/avatar";
import moment from "moment";
import { faker } from "@faker-js/faker";

const RatingReview: FunctionComponent<HomeScreenProps<"RatingReview">> = ({
  route: {
    params: { rating },
  },
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  return (
    <View className="h-full w-full flex flex-col items-center justify-start p-4">
      <Overall rating={rating} />
      <View className="border-b border-b-gray-300 my-4 w-full" />
      <ScrollView
        className="w-full h-16"
        style={{
          flexBasis: "auto",
        }}
        scrollEnabled={false}
      >
        <Filter
          selectedItem={selectedRating}
          setSelectedItem={setSelectedRating}
        />
      </ScrollView>
      <FlatList
        className="w-full"
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        renderItem={({ item }) => {
          const name = faker.person.fullName();
          const rating = faker.number.int({ min: 1, max: 5 });
          const date = faker.date.between({
            from: new Date("2023-12-01"),
            to: new Date("2023-12-10"),
          });

          return (
            <View className="flex flex-col py-4" key={item}>
              <View className="flex flex-row items-center justify-between">
                <View
                  className="flex flex-row items-center"
                  style={{
                    columnGap: 12,
                  }}
                >
                  <Image
                    className="h-12 w-12 rounded-full"
                    source={{
                      uri: getAvatar(name ?? "Eyub Yildirim"),
                    }}
                  />
                  <View className="flex flex-col">
                    <Text className="font-bold">{name}</Text>
                    <Text className="text-gray-400">
                      {moment(date).fromNow()}
                    </Text>
                  </View>
                </View>
                <View
                  className="flex-1 flex items-center justify-end flex-row"
                  style={{
                    columnGap: 8,
                  }}
                >
                  <StarRating
                    rating={rating}
                    starSize={20}
                    onChange={() => {}}
                    starStyle={{
                      gap: 0,
                      margin: 0,
                      padding: 0,
                      width: 8,
                    }}
                    color="#fc9701"
                    emptyColor="#ffdfaf"
                  />
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={32}
                    color="black"
                    className="ml-2"
                  />
                </View>
              </View>
              <Text className="mt-2 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                euismod, nisl eget aliquam ultricies, nunc
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const Overall: FunctionComponent<{ rating: number }> = ({ rating }) => {
  return (
    <View className="flex flex-row w-full justify-between">
      <View
        className="flex flex-col w-1/3 items-center justify-center"
        style={{
          rowGap: 8,
        }}
      >
        <Text className="text-4xl font-bold">{rating}</Text>
        <StarRating
          rating={rating}
          onChange={() => {}}
          starSize={24}
          starStyle={{
            gap: 0,
            margin: 0,
            padding: 0,
            width: 16,
          }}
          color="#fc9701"
          emptyColor="#ffdfaf"
        />
        <Text className="text-gray-400">(5.4k reviews)</Text>
      </View>
      <View className="h-full border-r border-r-gray-300" />
      <View className="flex flex-col">
        <View
          className="flex flex-row items-center"
          style={{
            columnGap: 8,
          }}
        >
          <Text className="font-bold text-xl">5</Text>
          <View className="rounded-full bg-gray-300 h-1 w-[50vw]">
            <View className="w-3/4 h-1 rounded-full bg-[#02c14d]" />
          </View>
        </View>
        <View
          className="flex flex-row items-center"
          style={{
            columnGap: 8,
          }}
        >
          <Text className="font-bold text-xl">4</Text>
          <View className="rounded-full bg-gray-300 h-1 w-[50vw]">
            <View className="w-3/5 h-1 rounded-full bg-[#02c14d]" />
          </View>
        </View>
        <View
          className="flex flex-row items-center"
          style={{
            columnGap: 8,
          }}
        >
          <Text className="font-bold text-xl">3</Text>
          <View className="rounded-full bg-gray-300 h-1 w-[50vw]">
            <View className="w-2/5 h-1 rounded-full bg-[#02c14d]" />
          </View>
        </View>
        <View
          className="flex flex-row items-center"
          style={{
            columnGap: 8,
          }}
        >
          <Text className="font-bold text-xl">2</Text>
          <View className="rounded-full bg-gray-300 h-1 w-[50vw]">
            <View className="w-1/5 h-1 rounded-full bg-[#02c14d]" />
          </View>
        </View>
        <View
          className="flex flex-row items-center"
          style={{
            columnGap: 8,
          }}
        >
          <Text className="font-bold text-xl">1</Text>
          <View className="rounded-full bg-gray-300 h-1 w-[50vw]">
            <View className="w-1/12 h-1 rounded-full bg-[#02c14d]" />
          </View>
        </View>
      </View>
    </View>
  );
};

const Filter: FunctionComponent<{
  selectedItem: number;
  setSelectedItem: (n: number) => void;
}> = ({ selectedItem, setSelectedItem }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={[1, 2, 3, 4, 5]}
      ItemSeparatorComponent={() => <View className="w-2" />}
      ListHeaderComponent={() => (
        <TouchableOpacity
          className="rounded-full border bg-white py-2 mr-2 px-4 border-gray-300 flex flex-row items-center"
          style={{
            columnGap: 4,
          }}
          onPress={() => {}}
        >
          <FontAwesome name="sort" size={18} color="black" />
          <View className="w-1" />
          <Text className="text-lg text-[#323232]">Sort By</Text>
        </TouchableOpacity>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="rounded-full border bg-white py-2 px-4 border-gray-300 flex flex-row items-center"
          onPress={() => setSelectedItem(item)}
        >
          <MaterialCommunityIcons
            name="star-outline"
            size={24}
            color="black"
            className="mr-2"
          />
          <View className="w-1" />
          <Text className="text-lg text-[#323232]">{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export const reviews = [
  {
    name: "Sandrina Pauly",
    rating: 5,
    date: new Date("2023-12-09"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 5,
    date: new Date("2023-12-12"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 4,
    date: new Date("2023-12-11"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 4,
    date: new Date("2023-12-08"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 3,
    date: new Date("2023-12-03"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 3,
    date: new Date("2023-12-05"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 2,
    date: new Date("2023-12-12"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 2,
    date: new Date("2023-12-01"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
  {
    name: "Sandrina Pauly",
    rating: 1,
    date: new Date("2023-12-11"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc ",
  },
];

export default RatingReview;
