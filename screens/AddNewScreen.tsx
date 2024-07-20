import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import NewEntryCard from '../components/Transactions/NewEntryCard';
import { AddNewScreenProps } from '../types';

export default function AddNewScreen({ navigation, route }: AddNewScreenProps) {

  return (
    <View style={styles.container}>
      <NewEntryCard navigation={navigation} route={route} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
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
