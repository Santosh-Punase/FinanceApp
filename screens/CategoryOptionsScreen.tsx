import { useEffect, useState } from 'react';

import useStore from '../hooks/useStore';
import { Category } from '../store/type';
import { parseObject, stringifyObject } from '../utils';
import { OptionsList } from '../components/OptionsList';
import { HeaderSearchBar } from '../components/HeaderSearchBar';

export default function CategoryOptionsScreen({ navigation, route }: any) {

  const [searchString, setSearchString] = useState<string>('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
  const [categories, mutateOptions, isLoading] = useStore('categories');
  const selectedOption = route.params.selectedOption;

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

  // @ts-ignore
  const parsedCategories: Category[] = categories !== '' ? parseObject(categories) : [];

  const updateTimestamp = (c: Category) => {
    const updatedCategories = parsedCategories.map(ct => ct.name === c.name ? c : ct);
    mutateOptions(stringifyObject(updatedCategories));
  }

  const addNewCategory = (c: Category) => {
    const updatedCategories = [ ...parsedCategories, c];
    mutateOptions(stringifyObject(updatedCategories));
  }

  const onSelect = (category: Category) => {
    updateTimestamp({ name: category.name, timestamp: Date.now() });
    navigation.navigate('AddNew', { category: category.name })
  }

  const onAddNew = (name: string) => {
    addNewCategory({ name, timestamp: Date.now() })
    setSearchString('');
    setIsSearchBoxOpen(false)
  }

  return (
    <OptionsList
      filteredRecords={parsedCategories.filter((c: Category) => c.name.toLowerCase().includes(searchString.toLowerCase())).sort((a,b) => a.name.localeCompare(b.name))}
      recordPluralName='categories'
      isLoading={isLoading}
      searchString={searchString}
      selectedOption={selectedOption}
      allRecords={parsedCategories}
      recordType='Category'
      onAddNew={onAddNew}
      onSelect={onSelect}
      updateOptions={(list) => mutateOptions(stringifyObject(list))}
    />
  );
}
