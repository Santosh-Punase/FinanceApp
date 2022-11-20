import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';

import { View, Text } from '../components/Themed';
import Layout from '../constants/Layout';
import useStore from '../hooks/useStore';
import { Category } from '../store/type';
import { parseObject, stringifyObject } from '../utils';

export default function CategoryOptionsScreen({ navigation, route }: any) {

  const [searchString, setSearchString] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [categories, setCategory, isLoading] = useStore('categories');

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
    if(searchString) {
      addNewCategory({ name: searchString, timestamp: Date.now() })
      setSearchString('');
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input value={searchString} style={[ isError ? { borderColor: 'red', borderWidth: 2 } : { } ]} onChangeText={(t) => {
          setSearchString(t)
          setIsError(false)
        }} placeholder={isError ? 'Enter category' : 'Search / Add'} />
        { !isError && <FontAwesome size={22} style={{ position: 'absolute', right: 10, }} name='search' color={'gray'} /> }
      </View>
      <ScrollView style={[{ width: '100%' }]}>
        { isLoading ? (
          <View style={{ height: Layout.window.height - 200, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={[{ width: '100%', paddingTop: 10, }]}>
            {parsedCategories.filter((c: Category) => c.name.toLowerCase().includes(searchString.toLowerCase())).sort((a,b) => b.timestamp - a.timestamp).map((c: Category, i: number) => (
              <View style={styles.listItem} key={i} >
                <TouchableOpacity onPress={() => onSelect(c)}>
                  <Text style={styles.category}>{c.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createTwoButtonAlert(c.name)}>
                  <Text style={styles.closeIcon}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} onPress={onAddNew}>
              <Text style={[styles.category, { color: 'blue' }]}> + Add {searchString || 'New'}</Text>
            </TouchableOpacity>
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 8,
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
    width: Layout.window.width - 80,
    textAlignVertical: 'center',
  },
});
