import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';

import { View, Text } from '../components/Themed';

export default function CategoryOptionsScreen({ navigation, route }: any) {

  const [searchString, setSearchString] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [categories, setCategory] = useState<string[]>(['Grocerry','Food','Entertainment']);

  const onAddNew = () => {
    if(searchString) {
      setCategory([ ...categories, searchString ]);
      setSearchString('');
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input value={searchString} style={[ isError ? { borderColor: 'red', borderWidth: 2 } : { } ]} onChangeText={(t) => setSearchString(t)} placeholder='Search / Add' />
        <FontAwesome size={22} style={{ position: 'absolute', right: 10, }} name='search' color={'gray'} />
      </View>
      {/* <View style={[{ marginTop: -10, marginBottom: 10 }]}>
        <Text style={styles.error}>Please enter category to be added!</Text>
      </View> */}
      <ScrollView style={[{ width: '100%' }]}>
        <View style={[{ width: '100%', borderWidth:1, borderRadius: 8, paddingTop: 10, }]}>
          {categories.filter(c => c.includes(searchString)).map((c, i) => (
            <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} key={i} onPress={() => navigation.navigate('AddNew', { category: c })}>
              <Text style={styles.category}>{c}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} onPress={onAddNew}>
            <Text style={[styles.category, { color: 'blue' }]}>Add</Text>
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
  error: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'red'
  },
});
