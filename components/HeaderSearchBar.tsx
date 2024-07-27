import { StyleSheet, TouchableOpacity, Pressable } from "react-native";

import Layout from "../constants/Layout";
import { Icon } from "./Icon";
import { Input } from "./Input";

type Props = {
  isSearchBoxOpen: boolean,
  searchString: string,
  setIsSearchBoxOpen: (isVisible: boolean) => void,
  setSearchString: (searchString: string) => void,
}

export function HeaderSearchBar({ isSearchBoxOpen, searchString, setIsSearchBoxOpen, setSearchString }: Props) {

  if(isSearchBoxOpen) {
    return (
      <>
        <Input value={searchString} autoFocus wrapperStyle={styles.searchInputWrapper} style={styles.searchInput} onChangeText={(t) => setSearchString(t)} placeholder={'Search'} />
        <TouchableOpacity onPress={() => { setIsSearchBoxOpen(false); setSearchString('') }}>
          <Icon type="AntDesign" name='close' size={20} style={{ marginRight: 0, padding: 10 }}/>
        </TouchableOpacity>
      </>
    )
  }
  return (
    <Pressable
      onPress={() => setIsSearchBoxOpen(true)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        padding: 10,
      })}>
      <Icon type="AntDesign" name="search1" size={20} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  searchInputWrapper: {
    height: 40,
    width: Layout.window.width - 110,
  },
  searchInput: {
    height: 40,
    borderWidth: 0,
    fontSize: 18,
  },
});
