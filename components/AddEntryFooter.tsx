import { FloatingButton } from "./FloatingButton";
import { WIDTH } from "../constants/Layout";
import { TRANSACTION_TYPE } from "../store/type";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { View } from "./Themed";
import { useTransactionContext } from "../contexts/TransactionContext";

export function AddEntryFooter({ navigation }: { navigation : NativeStackNavigatorProps }) {

  const { setTransaction } = useTransactionContext();

  const addNewTransaction = (type: TRANSACTION_TYPE ) => {
    setTransaction({ type });
    navigation.navigate('AddNewTransaction', {});
  }
 
  return (
    <View style={{ position: 'absolute', width: WIDTH, bottom: 0 }}>
      <FloatingButton
        onPress={() => addNewTransaction(TRANSACTION_TYPE.INCOME)}
        label={'+'}
        labelStyles={{ color: 'green' }}
        style={{ backgroundColor: '#c0f0cd', bottom: 10, left: WIDTH / 3 }}
      />
      <FloatingButton
        onPress={() => addNewTransaction(TRANSACTION_TYPE.EXPENSE)}
        label={'+'}
        labelStyles={{ color: 'red' }}
        style={{ backgroundColor: '#f2b6b6', bottom: 10, right: WIDTH / 3 }}
      />
    </View>
  );
}


