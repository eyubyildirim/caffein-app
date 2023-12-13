import { FunctionComponent, ReactNode } from "react";
import { FlatList, Text, View } from "react-native";

interface HorizontalItemListProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => JSX.Element;
  onViewAll?: () => void;
}

const HorizontalItemList = <T extends any>({
  title,
  items,
  renderItem,
  onViewAll,
}: HorizontalItemListProps<T> & { children?: ReactNode }) => {
  return (
    <View
      className="mt-6 flex flex-col w-full"
      style={{
        rowGap: 16,
      }}
    >
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-black flex-shrink">
          {title}
        </Text>
        <Text
          className="text-teal-500 text-base"
          onPress={() => {
            if (onViewAll) onViewAll();
          }}
        >
          View All
        </Text>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => renderItem(item)}
        horizontal
        ItemSeparatorComponent={() => <View className="w-3" />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HorizontalItemList;
