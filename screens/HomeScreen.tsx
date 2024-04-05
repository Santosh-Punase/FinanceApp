import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { FloatingButton } from '../components/FloatingButton';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TransactionType } from '../store/type';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const addNewTransaction = (transactionType: TransactionType ) => {
    navigation.navigate('AddNewTransaction', { category: undefined, paymentMode: undefined, transactionType })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
      <FloatingButton
        onPress={() => addNewTransaction('Cash-In')}
        label={'+'}
        style={{ backgroundColor: 'green', bottom: 100, }}
      />
      <FloatingButton
        onPress={() => addNewTransaction('Cash-Out')}
        label={'+'}
        style={{ backgroundColor: 'red', bottom: 20, }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
