import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { View } from '../components/Themed';
import { AddCategoryScreenProps } from '../types';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ButtonOutline, ButtonPrimary } from '../components/Button';
import { useState } from 'react';
import useApiCall from '../hooks/useApiCall';
import { saveCategory, updateCategory } from '../api/api';

export default function AddCategoryScreen({ navigation, route }: AddCategoryScreenProps) {

  const [categoryName, setCategoryName] = useState<string>(route.params.category?.name || '');
  const [budget, setBudget] = useState<string>(`${route.params.category?.budget || ''}`);
  const action = route.params.action;

  const goBack = () => {
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Root')
  }

  const showToastAndGoBack = (msg: string) => {
    Toast.show({
      type: 'success',
      text1: msg,
    });
    goBack()
  }

  const { isLoading: isSaveLoading, doApiCall: save } = useApiCall({
    apiCall: () => saveCategory({ name: categoryName, budget: parseFloat(budget) }),
    onSuccess: () => showToastAndGoBack('Category created successfully'),
  })

  const { isLoading: isUpdateLoading, doApiCall: update } = useApiCall({
    apiCall: () => updateCategory(route.params.category?.id!, { name: categoryName, budget: parseFloat(budget) }),
    onSuccess: () => showToastAndGoBack('Category updated successfully'),
  })

  return (
    <View style={styles.container}>
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
            style={[{ width: '48%' }]}
            labelStyles={styles.buttonLabel}
            onPress={goBack}
          />
          <ButtonPrimary
            disabled={!categoryName || !budget}
            label={'Save'}
            style={[{ width: '48%' }]}
            labelStyles={styles.buttonLabel}
            isLoading={action === 'Add' ? isSaveLoading : isUpdateLoading}
            onPress={action === 'Add' ? save : update}
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
