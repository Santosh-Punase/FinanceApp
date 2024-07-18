import { FloatingButton } from "./FloatingButton";
import { WIDTH } from "../constants/Layout";
import { TransactionType } from "../store/type";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { View } from "./Themed";

export function AddEntryFooter({ navigation }: { navigation : NativeStackNavigatorProps }) {

  const addNewTransaction = (transactionType: TransactionType ) => {
    navigation.navigate('AddNewTransaction', { category: undefined, paymentMode: undefined, transactionType })
  }
 
  return (
    <View style={{ position: 'absolute', width: WIDTH, bottom: 0 }}>
      <FloatingButton
        onPress={() => addNewTransaction('Cash-In')}
        label={'+'}
        labelStyles={{ color: 'green' }}
        style={{ backgroundColor: '#c0f0cd', bottom: 10, left: WIDTH / 3 }}
      />
      <FloatingButton
        onPress={() => addNewTransaction('Cash-Out')}
        label={'+'}
        labelStyles={{ color: 'red' }}
        style={{ backgroundColor: '#f2b6b6', bottom: 10, right: WIDTH / 3 }}
      />
    </View>
  );
}


