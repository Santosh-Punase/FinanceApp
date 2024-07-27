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
import { useOnFocusApiCall } from "../../hooks/useApiCall";
import { getTransactions } from "../../api/api";

interface Props {
  navigation: HomeScreenNavigation;
}

export function RecentTransactions({ navigation }: Props) {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // const [ transactionList, , isLoading , , fetchTransactions ] = useStore('transactionList');
  // // @ts-ignore
  // const parsedTransactionList: Transaction[] = parseObject(transactionList)?.sort((a,b) => b.createdAt - a.createdAt) || [];
  
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchTransactions();
  //   }, [transactionList])
  // );

  const { isLoading, data, refetch } = useOnFocusApiCall<Transaction[]>({
    apiCall: () => getTransactions(1, 5),
    initialState: [],
    dataExtractor: (data) => data.transactions,
  });

  return (
    <>
      <View style={{ width: WIDTH, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
        { isLoading ? (
          <LoadingSkeleton style={{ marginHorizontal: 20, marginTop: 10 }} itemStyle={{ width: 150 }}>
            <DefaultView style={{ height: 20 }} />
          </LoadingSkeleton>
        ): <Text style={styles.header}>Recent Transactions</Text>
      }
      </View>
      <View style={{ height: HEIGHT - 530 }}>
        <TransactionList
          list={data}
          refetchTransactions={refetch}
          isLoading={isLoading}
          listHeight={HEIGHT - 600}
          navigation={navigation}
        />
      </View>
    </>
  )
}
