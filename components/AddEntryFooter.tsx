import { FloatingButton } from "./FloatingButton";
import { WIDTH } from "../constants/Layout";
import { TRANSACTION_TYPE } from "../store/type";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useTransactionContext } from "../contexts/TransactionContext";
import Colors from "../constants/Colors";

export function AddEntryFooter({ navigation }: { navigation : NativeStackNavigatorProps }) {

  const { resetTransaction } = useTransactionContext();

  const addNewTransaction = (type: TRANSACTION_TYPE ) => {
    resetTransaction({ type });
    navigation.navigate('AddNewTransaction', {});
  }
 
  return (
    <>
      <FloatingButton
        onPress={() => addNewTransaction(TRANSACTION_TYPE.INCOME)}
        label={'+'}
        labelStyles={{ color: Colors.light.buttonSuccess }}
        style={{ backgroundColor: '#c0f0cd', right: WIDTH / 2 + 10 }}
      />
      <FloatingButton
        onPress={() => addNewTransaction(TRANSACTION_TYPE.EXPENSE)}
        label={'+'}
        labelStyles={{ color: Colors.light.buttonError }}
        style={{ backgroundColor: '#f2b6b6', right: WIDTH / 2 - 70 }}
      />
    </>
  );
}


