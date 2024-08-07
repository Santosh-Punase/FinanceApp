import { useEffect, useState } from 'react';

import useStore from '../hooks/useStore';
import { Option, PaymentModeOption } from '../store/type';
import { parseObject, stringifyObject } from '../utils';
import { HeaderSearchBar } from '../components/HeaderSearchBar';
import { PaymentOptionsScreenProps } from '../types';
import { InputModal } from '../components/Modals/InputModal';
import { ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet, ColorSchemeName, Alert } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { FloatingButton } from '../components/FloatingButton';
import { Icon } from '../components/Icon';
import { NoRecord } from '../components/NoRecord';
import { RadioButton } from '../components/RadioButton';
import Layout from '../constants/Layout';
import { View, Text } from '../components/Themed';
import { useTheme } from '../theme';
import Colors from '../constants/Colors';

export default function PaymentOptionsScreen({ navigation, route }: PaymentOptionsScreenProps) {

  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
  const [availableOptions, mutateOptions, isLoading] = useStore('paymentModes');
  const selectedPaymentMode = route?.params?.paymentMode || undefined;

  const currentTheme:ColorSchemeName = useTheme();
  const selectedOptionColor = Colors[currentTheme].selectedOption;
  const tintButton = '#2f95dc';
  const [optionToEdit, setOptionToEdit] = useState<PaymentModeOption | null>(null);

  const optionsContainerBackgroundColor = Colors[currentTheme].background;
  const optionsContainerShadowColor = Colors[currentTheme].text;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
      <HeaderSearchBar
        isSearchBoxOpen={isSearchBoxOpen}
        searchString={searchString}
        setIsSearchBoxOpen={setIsSearchBoxOpen}
        setSearchString={setSearchString}
      />
    )});
  }, [navigation, isSearchBoxOpen, searchString]);

  // @ts-ignore
  const parsedOptionsArray: PaymentModeOption[] = availableOptions !== '' ? parseObject(availableOptions) : [];

  const updateTimestamp = (record: PaymentModeOption) => {
    const updatedOptions = parsedOptionsArray.map(op => op.id === record.id ? record : op);
    mutateOptions(stringifyObject(updatedOptions));
  }

  const addNewOption = (op: PaymentModeOption) => {
    const updatedOptions = [ ...parsedOptionsArray, op];
    mutateOptions(stringifyObject(updatedOptions));
  }

  const onSelect = (selection: PaymentModeOption) => {
    updateTimestamp({ ...selection, lastUsedAt: Date.now() });
    navigation.navigate('AddNewTransaction', { category: route?.params?.category, paymentMode:  { id: selection.id, name: selection.name } })
  }

  const onAddNew = (name: string) => {
    addNewOption({ name, id: Math.random(), createdAt: Date.now(), updatedAt: Date.now(), lastUsedAt: Date.now() })
    setSearchString('');
    setIsSearchBoxOpen(false)
  }

  const updateOptions = (list: PaymentModeOption[]) => {
    mutateOptions(stringifyObject(list));
  }

  const editOption = (option: PaymentModeOption) => {
    const updatedOptions = parsedOptionsArray.map((op) => op.createdAt === option.createdAt ? option : op);
    mutateOptions(stringifyObject(updatedOptions));
  }

  const sortOptions = (a: PaymentModeOption, b: PaymentModeOption) => {
    return b.lastUsedAt - a.lastUsedAt;
  }

  const createTwoButtonAlert = (option: PaymentModeOption) =>
    Alert.alert(
      `Delete ${option.name} ?`,
      "Are you sure? This can't be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "YES",
          style: 'destructive',
          onPress: () => updateOptions(parsedOptionsArray.filter(op => op.id !== option.id))
        }
      ],
      { cancelable: true, }
    );
    const onCancelModal = () => {
      setShowAddEditModal(false);
      setOptionToEdit(null);
    }
  
    const onSubmitModal = (name: string) => {
      if(optionToEdit) {
        editOption({ ...optionToEdit, name, updatedAt: Date.now() })
        setOptionToEdit(null);
      } else {
        onAddNew(name);
      }
      setShowAddEditModal(false);
    }
    
  const filteredRecords = parsedOptionsArray.filter((p: Option) => p.name.toLowerCase().includes(searchString.toLowerCase())).sort(sortOptions)

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>{'categories'}</Text>
      </View>
      <ScrollView style={[{ width: '100%' }]}>
        { isLoading ? (
          <View style={{ height: Layout.window.height - 200, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={[{ width: '100%', paddingTop: 10, }]}>
            {filteredRecords.map((op, i) => {
              const isSelected = selectedPaymentMode?.id === op.id;
              return (
                <View style={isSelected ? [styles.listItem, { backgroundColor: selectedOptionColor }] : styles.listItem} key={i} darkColor={'rgba(255, 255, 255, 0.08)'} >
                  <TouchableOpacity onPress={() => onSelect(op)} style={styles.labelWrapper} activeOpacity={1}>
                    <RadioButton size={24} style={styles.radioIcon} isSelected={isSelected} />
                    <Text style={styles.optionLabel}>{op.name}</Text>
                  </TouchableOpacity>
                  <Menu style={styles.moreOptions}>
                    <MenuTrigger>
                      <Icon name="ellipsis-vertical" type='Ionicons' size={20} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ padding: 5, shadowColor: optionsContainerShadowColor, backgroundColor: optionsContainerBackgroundColor }}>
                      <MenuOption onSelect={() => editOption(op)}>
                        <Text>Edit</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => createTwoButtonAlert(op)} >
                        <Text style={{color: 'red'}}>Delete</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              )}
            )}
            { searchString && (
              <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} onPress={() => onAddNew(searchString)}>
                <Text style={[styles.optionLabel, { color: tintButton }]}> + Add {searchString}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        { filteredRecords.length === 0 && (
          <NoRecord
            header={`No Category Found`}
            subHeader="Try searching with different name or add new"
          />
        )}
      </ScrollView>
      <FloatingButton onPress={() => setShowAddEditModal(true)} label={'+'} style={{ bottom: 40, right: 20, backgroundColor: tintButton }}/>
      { showAddEditModal && (
        <InputModal
          title={optionToEdit ? `Edit Category`: `Add New Category`}
          initialValue={optionToEdit?.name || ''}
          placeholder={'Category'}
          onCancel={onCancelModal}
          onSubmit={onSubmitModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 20,
  },
  row: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  heading: {
    paddingHorizontal: 5,
    color: 'gray',
    textTransform: "capitalize",
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 8,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
  },
  radioIcon: {
    marginVertical: 'auto',
    paddingLeft: 16,
  },
  moreOptions: {
    width: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    textAlignVertical: 'center',
  },
});
