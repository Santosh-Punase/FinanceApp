import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View as DefaultView } from 'react-native';

import { HEIGHT, WIDTH } from "../../constants/Layout";
// import useStore from "../../hooks/useStore";
// import { parseObject } from "../../utils";
import { Text, View } from "../Themed";
import { styles } from "./styles";
import { HomeScreenNavigation } from "../../types";
import { LoadingSkeleton } from "../LoadingSkeleton";
import TransactionList from "../Transactions/TransactionList";
import { Transaction } from "../../store/type";
import useApiCall from "../../hooks/useApiCall";
import { getTransactions } from "../../api/api";

interface Props {
  navigation: HomeScreenNavigation;
}

export function RecentTransactions({ navigation }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // const [ transactionList, , isLoading , , fetchTransactions ] = useStore('transactionList');
  // // @ts-ignore
  // const parsedTransactionList: Transaction[] = parseObject(transactionList)?.sort((a,b) => b.createdAt - a.createdAt) || [];
  
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchTransactions();
  //   }, [transactionList])
  // );

  const { isLoading, doApiCall: fetchTransactions } = useApiCall({
    apiCall: () => getTransactions(1, 5),
    onSuccess: (data) => {
      setTransactions(data.transactions);
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <>
      <View style={{ width: WIDTH }}>
        { isLoading ? (
          <LoadingSkeleton style={{ marginHorizontal: 20, marginTop: 10 }} itemStyle={{ width: 150 }}>
            <DefaultView style={{ height: 20 }} />
          </LoadingSkeleton>
        ): <Text style={styles.header}>Recent Transactions</Text>
      }
      </View>
      <TransactionList
        list={transactions}
        isLoading={isLoading}
        listHeight={HEIGHT - 600}
        navigation={navigation}
      />
    </>
  )
}
