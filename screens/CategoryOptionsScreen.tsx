import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';

import { View, Text } from '../components/Themed';
import useStore from '../hooks/useStore';
import { Category } from '../store/type';
import { parseObject, stringifyObject } from '../utils';

export default function CategoryOptionsScreen({ navigation, route }: any) {

  const [searchString, setSearchString] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [categories, setCategory] = useStore('categories');

  const parsedCategories: Category[] = categories !== '' ? parseObject(categories) : [];

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
        <View style={[{ width: '100%', paddingTop: 10, }]}>
          {parsedCategories.filter((c: Category) => c.name.toLowerCase().includes(searchString.toLowerCase())).sort((a,b) => b.timestamp - a.timestamp).map((c: Category, i: number) => (
            <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} key={i} onPress={() => onSelect(c)}>
              <Text style={styles.category}>{c.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} onPress={onAddNew}>
            <Text style={[styles.category, { color: 'blue' }]}> + Add {searchString || 'New'}</Text>
          </TouchableOpacity>
        </View>
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
  category: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    textAlignVertical: 'center',
  },
});
