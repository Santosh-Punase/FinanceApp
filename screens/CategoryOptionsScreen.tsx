import { useCallback, useEffect, useState } from 'react';

import { CategoryOption } from '../store/type';
import { HeaderSearchBar } from '../components/HeaderSearchBar';
import { CategoryOptionsScreenProps } from '../types';
import { ScrollView, TouchableOpacity, StyleSheet, ColorSchemeName, Alert } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { FloatingButton } from '../components/FloatingButton';
import { Icon } from '../components/Icon';
import { NoRecord } from '../components/NoRecord';
import { RadioButton } from '../components/RadioButton';
import { View, Text } from '../components/Themed';
import { useTheme } from '../theme';
import Colors from '../constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { ListLoading } from '../components/LoadingSkeleton';
import useApiCall from '../hooks/useApiCall';
import { deleteCategory, getCategories } from '../api/api';
import Toast from 'react-native-toast-message';

export default function CategoryOptionsScreen({ navigation, route }: CategoryOptionsScreenProps) {

  const [searchString, setSearchString] = useState<string>('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const selectedCategory = route?.params?.category || undefined;

  const currentTheme:ColorSchemeName = useTheme();
  const selectedOptionColor = Colors[currentTheme].selectedOption;
  const tintButton = Colors[currentTheme].buttonPrimaryBG;

  const optionsContainerBackgroundColor = Colors[currentTheme].background;
  const optionsContainerShadowColor = Colors[currentTheme].text;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
      <HeaderSearchBar
        isSearchBoxOpen={isSearchBoxOpen}
        searchString={searchString}
        setIsSearchBoxOpen={setIsSearchBoxOpen}
        setSearchString={setSearchString}
      />
    )});
  }, [navigation, isSearchBoxOpen, searchString]);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const { isLoading: isFetchLoading, doApiCall: fetchCategories } = useApiCall({
    apiCall: () => getCategories(),
    onSuccess: (data) => {
      setCategories(data);
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const addCategory = () => {
    setSearchString('');
    setIsSearchBoxOpen(false);
    navigation.navigate('AddCategoryScreen', { header: 'Add Category', category: { name: searchString }, action: 'Add' })
  }

  const editCategory = (cat: CategoryOption) => {
    setSearchString('');
    setIsSearchBoxOpen(false);
    navigation.navigate('AddCategoryScreen', { header: 'Edit Category', category: { name: cat.name, budget: cat.budget, id: cat._id }, action: 'Edit' })
  }
    
  const onSelect = (selection: CategoryOption) => {
    if (route.params?.action === 'select') {
      navigation.navigate('AddNewTransaction', { category: { id: selection._id, name: selection.name }, paymentMode: route?.params?.paymentMode })
    } else {
      editCategory(selection);
    }
  }

  const sortOptions = (a: CategoryOption, b: CategoryOption) => {
    return a.name.localeCompare(b.name);
  }

  const createTwoButtonAlert = (option: CategoryOption) =>
    Alert.alert(
      `Delete ${option.name} ?`,
      "Are you sure? This can't be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "YES",
          style: 'destructive',
          onPress: () => {
            setIsDeleteLoading(true);
            deleteCategory(`${option._id}`)
              .then(() => {
                setCategories(categories.filter(op => op._id !== option._id));
                Toast.show({ type: 'success', text1: `Category ${option.name} deleted` })
              }).finally(() => {
                setIsDeleteLoading(false);
              })
          }
        }
      ],
      { cancelable: true, }
    );

  const filteredRecords: CategoryOption[] = categories.filter((p: CategoryOption) => p.name.toLowerCase().includes(searchString.toLowerCase())).sort(sortOptions);

  const isLoading = isFetchLoading || isDeleteLoading
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>{'categories'}</Text>
      </View>
      <ScrollView style={[{ width: '100%' }]}>
        { isLoading ? (
          <ListLoading />
        ) : (
          <View style={[{ width: '100%', paddingTop: 10, }]}>
            {filteredRecords.map((op, i) => {
              const isSelected = selectedCategory?.id === op._id;
              return (
                <View style={isSelected ? [styles.listItem, { backgroundColor: selectedOptionColor }] : styles.listItem} key={i} darkColor={'rgba(255, 255, 255, 0.08)'} >
                  <TouchableOpacity onPress={() => onSelect(op)} style={styles.labelWrapper} activeOpacity={1}>
                    { route.params?.action === 'select' && (
                      <RadioButton size={24} style={styles.radioIcon} isSelected={isSelected} />
                    )}
                    <Text style={styles.optionLabel}>{op.name}</Text>
                  </TouchableOpacity>
                  <Menu style={styles.moreOptions}>
                    <MenuTrigger>
                      <Icon name="ellipsis-vertical" type='Ionicons' size={20} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ padding: 5, shadowColor: optionsContainerShadowColor, backgroundColor: optionsContainerBackgroundColor }}>
                      <MenuOption onSelect={() => editCategory(op)}>
                        <Text>Edit</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => createTwoButtonAlert(op)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              )}
            )}
            { searchString && (
              <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} onPress={addCategory}>
                <Text style={[styles.optionLabel, { color: tintButton }]}> + Add {searchString}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        { !isLoading && filteredRecords.length === 0 && (
          <NoRecord
            header={`No Category Found`}
            subHeader="Try searching with different name or add new"
          />
        )}
      </ScrollView>
      <FloatingButton
        onPress={addCategory}
        label={'+'}
        style={{ bottom: 40, right: 20, backgroundColor: tintButton }}
      />
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
  heading: {
    paddingHorizontal: 5,
    color: 'gray',
    textTransform: "capitalize",
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 8,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
  },
  radioIcon: {
    marginVertical: 'auto',
    paddingLeft: 16,
  },
  moreOptions: {
    width: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    textAlignVertical: 'center',
  },
});
