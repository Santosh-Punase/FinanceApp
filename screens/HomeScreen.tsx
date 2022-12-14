import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { FloatingButton } from '../components/FloatingButton';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
      <FloatingButton
        onPress={() => navigation.navigate('AddNewTransaction', { category: '', paymentMode: '', transactionType: 'Cash-In' })}
        label={'+'}
        style={{ backgroundColor: 'green', bottom: 100, }}
      />
      <FloatingButton
        onPress={() => navigation.navigate('AddNewTransaction', { category: '', paymentMode: '', transactionType: 'Cash-Out' })}
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
