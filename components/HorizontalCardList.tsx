import { FlatList, ListRenderItem, StyleProp, ViewStyle } from "react-native";

type HorizontalCardListProps<T> = {
  data: T[]
  renderItem: ListRenderItem<T> | null | undefined
  style?: StyleProp<ViewStyle> 
  keyExtractor?: (item: T, index: number) => string
}

export function HorizontalCardList<T>({ data, renderItem, keyExtractor, style }: HorizontalCardListProps<T>) {

  if (data.length <= 0) return null;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      style={style}
      keyExtractor={keyExtractor}
      horizontal
      scrollEnabled={true}
      // scrollEnabled={rewardSectionData?.length > 2}
      showsHorizontalScrollIndicator={false}
    />
  );
}
