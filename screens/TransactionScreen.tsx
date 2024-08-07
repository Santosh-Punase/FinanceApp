import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import TransactionList from '../components/Transactions/TransactionList';
import { RootTabScreenProps } from '../types';
import TransactionFilters, { SelectedFilters } from '../components/Transactions/TransactionFilters';
import { Transaction } from '../store/type';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import useStore from '../hooks/useStore';
import { parseObject } from '../utils';

export const filterInitialState: SelectedFilters = {
  transactionType: '',
  category: [],
  paymentMode: [],
}
export default function TransactionScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [ transactionList, , isLoading , , fetchList ] = useStore('transactionList');
  // @ts-ignore
  const parsedTransactionList: Transaction[] = parseObject(transactionList)?.sort((a,b) => b.createdAt - a.createdAt) || [];
  const [selectedFilters, setSelectedFilters] = useState(filterInitialState)
  const isFilterSelected = selectedFilters.transactionType !== '' || selectedFilters.category.length > 0 || selectedFilters.paymentMode.length > 0

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [transactionList])
  );

  const filteredList = parsedTransactionList.filter((item: Transaction, i: number) => (
    (selectedFilters.transactionType === '' || item.transactionType === selectedFilters.transactionType) &&
    (selectedFilters.category.length === 0 || selectedFilters.category.includes(item.category?.id || -1)) &&
    (selectedFilters.paymentMode.length === 0 || selectedFilters.paymentMode.includes(item.paymentMode?.id || -1))
  ));

  return (
    <View style={styles.container} darkColor='rgba(255,255,255,0.08)' lightColor='rgba(0,0,0, 0.02)'>
      <TransactionFilters
        selectedFilters={selectedFilters}
        setFilter={(filter, selectedOptions) => setSelectedFilters({ ...selectedFilters, [filter]: selectedOptions})}
      />
      <TransactionList
        isLoading={isLoading}
        isFilterSelected={isFilterSelected}
        clearAllFilters={() => setSelectedFilters(filterInitialState)}
        list={filteredList}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
