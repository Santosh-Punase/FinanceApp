import { useEffect, useState } from 'react';

import useStore from '../hooks/useStore';
import { DropdownLabel, Option } from '../store/type';
import { parseObject, stringifyObject } from '../utils';
import { OptionsList } from '../components/OptionsList';
import { HeaderSearchBar } from '../components/HeaderSearchBar';
import { OptionsScreenProps } from '../types';

export default function OptionsScreen({ navigation, route }: OptionsScreenProps) {

  const dropdownLabel: DropdownLabel = route?.params?.dropdownLabel;
  const [searchString, setSearchString] = useState<string>('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
  const [availabelOptions, mutateOptions, isLoading] = useStore(dropdownLabel);
  const selectedOption = dropdownLabel === 'categories' ? route?.params?.category : route?.params?.paymentMode;

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
  const parsedOptionsArray: Option[] = availabelOptions !== '' ? parseObject(availabelOptions) : [];

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
    if(dropdownLabel === 'categories') {
      navigation.navigate('AddNewTransaction', { category: selection.name, paymentMode: route?.params?.paymentMode })
    } else {
      navigation.navigate('AddNewTransaction', { category: route?.params?.category, paymentMode: selection.name })
    }
  }

  const onAddNew = (name: string) => {
    addNewOption({ name, createdAt: Date.now(), updatedAt: Date.now(), lastUsedAt: Date.now() })
    setSearchString('');
    setIsSearchBoxOpen(false)
  }

  const sortOptions = (a: Option, b: Option) => {
    if(dropdownLabel === 'categories')
      return a.name.localeCompare(b.name);
    return b.lastUsedAt - a.lastUsedAt;
  }

  return (
    <OptionsList
      filteredRecords={parsedOptionsArray.filter((p: Option) => p.name.toLowerCase().includes(searchString.toLowerCase())).sort(sortOptions)}
      recordPluralName={dropdownLabel === 'categories' ? 'categories' : 'Payment Modes'}
      isLoading={isLoading}
      searchString={searchString}
      selectedOption={selectedOption}
      allRecords={parsedOptionsArray}
      recordType={dropdownLabel === 'categories' ? 'Category' : 'Payment Mode'}
      onAddNew={onAddNew}
      onSelect={onSelect}
      updateOptions={(list) => mutateOptions(stringifyObject(list))}
    />
  );
}
