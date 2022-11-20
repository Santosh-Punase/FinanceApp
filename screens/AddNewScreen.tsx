import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import NewEntryCard from '../components/Transactions/NewEntryCard';

export default function AddNewScreen({ navigation, route }: any) {

  return (
    <View style={styles.container}>
      <NewEntryCard navigation={navigation} category={route?.params?.category} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingBottom: 0,
  }
});
