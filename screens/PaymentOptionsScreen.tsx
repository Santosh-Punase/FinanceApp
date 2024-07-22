import { useCallback, useEffect, useState } from 'react';

import useStore from '../hooks/useStore';
import { Option, PaymentModeOption } from '../store/type';
import { parseObject, stringifyObject } from '../utils';
import { HeaderSearchBar } from '../components/HeaderSearchBar';
import { PaymentOptionsScreenProps } from '../types';
import { InputModal } from '../components/Modals/InputModal';
import { ScrollView, TouchableOpacity, StyleSheet, ColorSchemeName, Alert } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { FloatingButton } from '../components/FloatingButton';
import { Icon } from '../components/Icon';
import { NoRecord } from '../components/NoRecord';
import { RadioButton } from '../components/RadioButton';
import { View, Text } from '../components/Themed';
import { useTheme } from '../theme';
import Colors from '../constants/Colors';
import { ListLoading } from '../components/LoadingSkeleton';
import useApiCall from '../hooks/useApiCall';
import { deletePaymentMode, getPaymentModes, savePaymentMode, updatePaymentMode } from '../api/api';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function PaymentOptionsScreen({ navigation, route }: PaymentOptionsScreenProps) {

  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  // const [availableOptions, mutateOptions, isLoading] = useStore('paymentModes');
  const selectedPaymentMode = route?.params?.paymentMode || undefined;
  const routeAction = route.params?.action;

  const currentTheme:ColorSchemeName = useTheme();
  const selectedOptionColor = Colors[currentTheme].selectedOption;
  const tintButton = Colors[currentTheme].buttonPrimaryBG;
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
  // const parsedOptionsArray: PaymentModeOption[] = availableOptions !== '' ? parseObject(availableOptions) : [];

  // const updateTimestamp = (record: PaymentModeOption) => {
  //   const updatedOptions = parsedOptionsArray.map(op => op.id === record.id ? record : op);
  //   mutateOptions(stringifyObject(updatedOptions));
  // }

  // const addNewOption = (op: PaymentModeOption) => {
  //   const updatedOptions = [ ...parsedOptionsArray, op];
  //   mutateOptions(stringifyObject(updatedOptions));
  // }
  const [paymentModes, setPaymentModes] = useState<PaymentModeOption[]>([]);
  const { isLoading: isFetchLoading, doApiCall: fetchPaymentModes } = useApiCall({
    apiCall: () => getPaymentModes(),
    onSuccess: (data) => {
      setPaymentModes(data);
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchPaymentModes();
    }, [])
  );

  const onSelect = (selection: PaymentModeOption) => {
  //   updateTimestamp({ ...selection, lastUsedAt: Date.now() });
    if (routeAction === 'select') {
      navigation.navigate('AddNewTransaction', { category: route?.params?.category, paymentMode:  { id: selection._id, name: selection.name } });
    } else {
      editOption(selection);
    }
  }

  const onAddNew = (name: string) => {
    // addNewOption({ name, id: Math.random(), createdAt: Date.now(), updatedAt: Date.now(), lastUsedAt: Date.now() })
    setSearchString('');
    setIsSearchBoxOpen(false)
    setOptionToEdit({ name, _id: '' })
    setShowAddEditModal(true);
  }

  // const updateOptions = (list: PaymentModeOption[]) => {
  //   mutateOptions(stringifyObject(list));
  // }

  const editOption = (option: PaymentModeOption) => {
    setOptionToEdit(option);
    setShowAddEditModal(true);
  //   const updatedOptions = parsedOptionsArray.map((op) => op.createdAt === option.createdAt ? option : op);
  //   mutateOptions(stringifyObject(updatedOptions));
  }

  const sortOptions = (a: PaymentModeOption, b: PaymentModeOption) => {
    return a.name.localeCompare(b.name);
  }

  const onDelete = (option: PaymentModeOption) => {
    deletePaymentMode(option._id)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: `${option.name} deleted!`,
      });
      setPaymentModes(paymentModes.filter(p => p._id !== option._id));
    })
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
          onPress: () => onDelete(option) // updateOptions(parsedOptionsArray.filter(op => op._id !== option._id))
        }
      ],
      { cancelable: true, }
    );
    const onCancelModal = () => {
      setShowAddEditModal(false);
      setOptionToEdit(null);
    }
  
    
  const showToastAndClose = (msg: string) => {
    Toast.show({
      type: 'success',
      text1: msg,
    });
    setIsSaveLoading(false);
    setShowAddEditModal(false);
    setOptionToEdit(null);
    fetchPaymentModes();
  }
    const onSubmitModal = (name: string) => {
      setIsSaveLoading(true);
      if(optionToEdit?._id) {
        // editOption({ ...optionToEdit, name, updatedAt: Date.now() })
        updatePaymentMode(optionToEdit._id, { name })
        .then(() => showToastAndClose(`Updated successfully!`))
        .catch(() => {
          setIsSaveLoading(false);
        });
      } else {
        // onAddNew(name);
        savePaymentMode({ name })
        .then(() => showToastAndClose('Payment mode created!'))
        .catch(() => {
          setIsSaveLoading(false);
        });
      }
    }
    
  const filteredRecords = paymentModes.filter((p: PaymentModeOption) => p.name.toLowerCase().includes(searchString.toLowerCase())).sort(sortOptions)
  const isLoading = isFetchLoading;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>{'Payment Modes'}</Text>
      </View>
      <ScrollView style={[{ width: '100%' }]}>
        { isLoading ? (
          <ListLoading />
        ) : (
          <View style={[{ width: '100%', paddingTop: 10, }]}>
            {filteredRecords.map((op, i) => {
              const isSelected = selectedPaymentMode?.id === op._id;
              return (
                <View style={isSelected ? [styles.listItem, { backgroundColor: selectedOptionColor }] : styles.listItem} key={i} darkColor={'rgba(255, 255, 255, 0.08)'} >
                  <TouchableOpacity onPress={() => onSelect(op)} style={styles.labelWrapper} activeOpacity={1}>
                    { routeAction === 'select' && (
                      <RadioButton size={24} style={styles.radioIcon} isSelected={isSelected} />
                    )}
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
        { !isLoading && filteredRecords.length === 0 && (
          <NoRecord
            header={`No Category Found`}
            subHeader="Try searching with different name or add new"
          />
        )}
      </ScrollView>
      <FloatingButton onPress={() => setShowAddEditModal(true)} label={'+'} style={{ bottom: 40, right: 20, backgroundColor: tintButton }}/>
      { showAddEditModal && (
        <InputModal
          title={optionToEdit?._id ? `Edit Payment Mode`: `Add New Payment Mode`}
          initialValue={optionToEdit?.name || ''}
          placeholder={'Payment Mode'}
          onCancel={onCancelModal}
          isLoading={isSaveLoading}
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
