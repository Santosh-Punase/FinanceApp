import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';

import { View, Text } from '../components/Themed';
import Layout from '../constants/Layout';
import useStore from '../hooks/useStore';
import { Category } from '../store/type';
import { parseObject, stringifyObject } from '../utils';

export default function CategoryOptionsScreen({ navigation, route }: any) {

  const [searchString, setSearchString] = useState<string>('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
  const [categories, setCategory, isLoading] = useStore('categories');
  const selectedOption = route.params.selectedOption;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if(isSearchBoxOpen) {
          return (
            <>
              <Input value={searchString} autoFocus style={styles.searchInput} onChangeText={(t) => setSearchString(t)} placeholder={'Search'} />
              <TouchableOpacity onPress={() => { setIsSearchBoxOpen(false); setSearchString('') }}>
                <AntDesign name='close' size={20} style={{ marginRight: 30 }}/>
              </TouchableOpacity>
            </>
          )
        }
        return (
          <Pressable
            onPress={() => setIsSearchBoxOpen(true)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <AntDesign name="search1" size={20} />
          </Pressable>
        )
      },
    });
  }, [navigation, isSearchBoxOpen, searchString]);

  // @ts-ignore
  const parsedCategories: Category[] = categories !== '' ? parseObject(categories) : [];

  const createTwoButtonAlert = (category: string) =>
    Alert.alert(
      `Delete ${category} ?`,
      "Are you sure? This can't be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "YES",
          style: 'destructive',
          onPress: () => setCategory(stringifyObject(parsedCategories.filter((c) => c.name !== category )))
        }
      ],
      { cancelable: true, }
    );

  const updateTimestamp = (c: Category) => {
    const updatedCategories = parsedCategories.map(ct => ct.name === c.name ? c : ct);
    setCategory(stringifyObject(updatedCategories));
  }

  const addNewCategory = (c: Category) => {
    const updatedCategories = [ ...parsedCategories, c];
    setCategory(stringifyObject(updatedCategories));
  }

  const onSelect = (category: Category) => {
    updateTimestamp({ name: category.name, timestamp: Date.now() });
    navigation.navigate('AddNew', { category: category.name })
  }

  const onAddNew = () => {
    addNewCategory({ name: searchString, timestamp: Date.now() })
    setSearchString('');
    setIsSearchBoxOpen(false)
  }

  const filteredRecords = parsedCategories.filter((c: Category) => c.name.toLowerCase().includes(searchString.toLowerCase()));
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>Categories</Text>
      </View>
      <ScrollView style={[{ width: '100%' }]}>
        { isLoading ? (
          <View style={{ height: Layout.window.height - 200, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={[{ width: '100%', paddingTop: 10, }]}>
            {filteredRecords.sort((a,b) => b.timestamp - a.timestamp).map((c: Category, i: number) => (
              <View style={styles.listItem} key={i} >
                { selectedOption === c.name
                  ? <Ionicons name="radio-button-on" size={24} style={styles.radioIcon} color="blue" />
                  : <Ionicons name="radio-button-off" size={24} style={styles.radioIcon} color="black" />
                }
                <TouchableOpacity onPress={() => onSelect(c)}>
                  <Text style={styles.category}>{c.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createTwoButtonAlert(c.name)}>
                  <Text style={styles.closeIcon}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
            { searchString && (
              <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} onPress={onAddNew}>
                <Text style={[styles.category, { color: 'blue' }]}> + Add {searchString}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        { filteredRecords.length === 0 && (
          <View style={styles.noResult}>
            <Text style={styles.noResultHeader}>No Categories Found</Text>
            <Text style={styles.noResultSubHeader}>Try searching with different name or add new</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 20,
  },
  row: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  searchInput: {
    position: 'absolute',
    right: 20,
    top: -20,
    height: 40,
    width: Layout.window.width - 120,
    borderWidth: 0,
    fontSize: 18,
  },
  heading: {
    paddingHorizontal: 5,
    color: 'gray',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 16,
    borderRadius: 8,
  },
  radioIcon: {
    marginVertical: 'auto',
    paddingLeft: 16,
  },
  closeIcon: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    textAlignVertical: 'center',
    fontSize: 30,
    color: 'red',
    transform: [{ rotateZ: '45deg' }]
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    width: Layout.window.width - 100,
    textAlignVertical: 'center',
  },
  noResult: {
    height: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultHeader: {
    fontSize: 22,
  },
  noResultSubHeader: {
    fontSize: 14,
    marginTop: 10,
  },
});
