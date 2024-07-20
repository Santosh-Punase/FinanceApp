import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { AddCategoryScreenProps } from '../types';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ButtonOutline, ButtonPrimary } from '../components/Button';
import { useState } from 'react';
import useStore from '../hooks/useStore';
import { parseObject, stringifyObject } from '../utils';

export default function AddCategoryScreen({ navigation, route }: AddCategoryScreenProps) {

  const [categoryName, setCategoryName] = useState<string>(route.params.category?.name || '');
  const [budget, setBudget] = useState<string>(`${route.params.category?.budget || ''}`);
  const [availableOptions, mutateOptions, isLoading] = useStore('categories');

  // @ts-ignore
  const parsedOptionsArray: CategoryOption[] = availableOptions !== '' ? parseObject(availableOptions) : [];

  const goBack = () => {
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Root')
  }

  const saveCategory = async () => {
    const category = { name: categoryName, id: Math.random(), createdAt: Date.now(), updatedAt: Date.now(), budget, expense: 0 }
    const updatedOptions = [ ...parsedOptionsArray, category];
    await mutateOptions(stringifyObject(updatedOptions));
    goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Card style={[styles.wrapperCard]}>
        <Input
          showLabel
          label='Name'
          placeholder='Category Name'
          value={categoryName}
          onChangeText={(category) => setCategoryName(category)}
        />
        <Input
          showLabel
          placeholder='Budget'
          value={budget.toString()}
          keyboardType='numeric'
          onChangeText={(budget) => {
            setBudget(budget)
          }}
        />
        <View style={styles.bottomRow}>
          <ButtonOutline
            // activeOpacity={1}
            label={'Cancel'}
            // buttonType='outline'
            style={[{ width: '48%' }]}
            labelStyles={styles.buttonLabel}
            onPress={goBack}
          />
          <ButtonPrimary
            disabled={!categoryName || !budget}
            label={'Save'}
            style={[{ width: '48%' }]}
            labelStyles={styles.buttonLabel}
            isLoading={isLoading}
            onPress={saveCategory}
          />
        </View>
      </Card>
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
  },
  wrapperCard: {
    flexDirection: 'column',
    height: '100%',
    paddingBottom: 0,
    paddingTop: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'semibold',
    width: '100%',
    textAlign: 'center',
  },
});
