import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreKey } from './type';

export const setValue = async (key: StoreKey, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
};

export const getValue = async (key: StoreKey) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch(e) {
    // read error
  }
}

export const removeValue = async (key: StoreKey) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }
}

export const initialize = async (key: StoreKey, defaultValue: string) => {
  const value = await getValue(key)

  if(value === null || value === '') {
    setValue(key, defaultValue);
  }
}

export const clearStorage = async () => {
  await AsyncStorage.clear()
}
