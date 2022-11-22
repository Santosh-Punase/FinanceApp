import { useEffect, useState } from 'react';

import useStore from '../hooks/useStore';
import { Option } from '../store/type';
import { parseObject, stringifyObject } from '../utils';
import { OptionsList } from '../components/OptionsList';
import { HeaderSearchBar } from '../components/HeaderSearchBar';
import { OptionsScreenProps } from '../types';

export default function CategoryOptionsScreen({ navigation, route }: OptionsScreenProps) {

  const [searchString, setSearchString] = useState<string>('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
  const [categories, mutateOptions, isLoading] = useStore('categories');
  const selectedOption = route.params.category;

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
  const parsedOptionsArray: Option[] = categories !== '' ? parseObject(categories) : []; //njjkn

  const updateTimestamp = (record: Option) => {
    const updatedOptions = parsedOptionsArray.map(op => op.name === record.name ? record : op);
    mutateOptions(stringifyObject(updatedOptions));
  }

  const addNewOption = (op: Option) => {
    const updatedOptions = [ ...parsedOptionsArray, op];
    mutateOptions(stringifyObject(updatedOptions));
  }

  const onSelect = (selection: Option) => {
    updateTimestamp({ ...selection, lastUsedAt: Date.now() });
    navigation.navigate('AddNewTransaction', { category: selection.name })
  }

  const onAddNew = (name: string) => {
    addNewOption({ name, createdAt: Date.now(), updatedAt: Date.now() })
    setSearchString('');
    setIsSearchBoxOpen(false)
  }

  const sortOptions = (a: Option, b: Option) => {
    return a.name.localeCompare(b.name);
  }

  return (
    <OptionsList
      filteredRecords={parsedOptionsArray.filter((p: Option) => p.name.toLowerCase().includes(searchString.toLowerCase())).sort(sortOptions)}
      recordPluralName='categories'
      isLoading={isLoading}
      searchString={searchString}
      selectedOption={selectedOption}
      allRecords={parsedOptionsArray}
      recordType='Category'
      onAddNew={onAddNew}
      onSelect={onSelect}
      updateOptions={(list) => mutateOptions(stringifyObject(list))}
    />
  );
}
