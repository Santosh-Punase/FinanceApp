import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import TransactionList from '../components/Transactions/TransactionList';
import { RootTabScreenProps } from '../types';
import TransactionFilters, { SelectedFilters } from '../components/Transactions/TransactionFilters';
import { Transaction } from '../store/type';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
// import useStore from '../hooks/useStore';
// import { parseObject } from '../utils';
import { getTransactions } from '../api/api';


export const filterInitialState: SelectedFilters = {
  type: undefined,
  categories: [],
  paymentModes: [],
}
export default function TransactionScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStaleCategories, setIsStaleCategories] = useState<boolean>(false);
  const [isStalePaymentModes, setIsStalePaymentModes] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // const [ transactionList, , isLoading , , fetchList ] = useStore('transactionList');
  // @ts-ignore
  // const parsedTransactionList: Transaction[] = parseObject(transactionList)?.sort((a,b) => b.createdAt - a.createdAt) || [];
  const [selectedFilters, setSelectedFilters] = useState(filterInitialState)
  const isFilterSelected = !!selectedFilters.type || selectedFilters.categories.length > 0 || selectedFilters.paymentModes.length > 0

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchList();
  //   }, [transactionList])
  // );

  const fetchTransactions = (page: number) => {
    setIsLoading(true);
    getTransactions(page, 10, selectedFilters.type, selectedFilters.categories.join(','), selectedFilters.paymentModes.join(','))
    .then((data) => {
      if (page == 1) {
        // @ts-ignore
        setTransactions(data.transactions);
        // @ts-ignore
        setTotalPages(data.totalPages);
      } else {
        // @ts-ignore
        setTransactions([... transactions, ...data.transactions]);
      }
    }).catch()
    .finally(() => {
      setIsLoading(false);
    })
  }

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(1);
      setIsStaleCategories(true);
      setIsStalePaymentModes(true);
    }, [])
  );

  useEffect(() => {
    setCurrentPage(1);
    if (currentPage === 1) {
      fetchTransactions(1);
    }
  }, [selectedFilters]);


  useEffect(() => {
    if(currentPage) {
      fetchTransactions(currentPage);
    }
  }, [currentPage]);


  const loadMoreData = () => {
    if (currentPage === totalPages) {
      return ;
    }
    setCurrentPage(currentPage + 1);
  };
  
  // const filteredList = parsedTransactionList.filter((item: Transaction, i: number) => (
  //   (selectedFilters.transactionType === '' || item.transactionType === selectedFilters.transactionType) &&
  //   (selectedFilters.category.length === 0 || selectedFilters.category.includes(item.category?.id || -1)) &&
  //   (selectedFilters.paymentMode.length === 0 || selectedFilters.paymentMode.includes(item.paymentMode?.id || -1))
  // ));

  return (
    <View style={styles.container}>
      <TransactionFilters
        isLoading={isLoading}
        isStaleCategories={isStaleCategories}
        setIsStaleCategories={setIsStaleCategories}
        setIsStalePaymentModes={setIsStalePaymentModes}
        isStalePaymentModes={isStalePaymentModes}
        isFilterSelected={isFilterSelected}
        selectedFilters={selectedFilters}
        setFilter={(filter, selectedOptions) => setSelectedFilters({ ...selectedFilters, [filter]: selectedOptions})}
      />
      <TransactionList
        isLoading={isLoading}
        isLoadingMore={currentPage > 1}
        isFilterSelected={isFilterSelected}
        loadMore={loadMoreData}
        clearAllFilters={() => setSelectedFilters(filterInitialState)}
        list={transactions}
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
