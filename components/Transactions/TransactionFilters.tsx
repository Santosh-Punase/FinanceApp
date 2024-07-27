import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View as DefaultView } from 'react-native';

import { Dropdown } from '../Dropdown';
import { Text, View } from '../Themed';
import { FilterModal } from '../Modals/FilterModal';
import { Checkbox, RadioButton } from '../RadioButton';
// import useStore from '../../hooks/useStore';
import { CategoryOption, PaymentModeOption, TRANSACTION_TYPE } from '../../store/type';
// import { parseObject } from '../../utils';
import { LoadingSkeleton, ModalListLoading } from '../LoadingSkeleton';
import { Icon } from '../Icon';
import useApiCall from '../../hooks/useApiCall';
import { getCategories, getPaymentModes } from '../../api/api';
// import { useFocusEffect } from '@react-navigation/native';

export type FilterType = 'TRANSACTION_TYPE' | 'CATEGORY' | 'PAYMENT_MODE' | 'NONE';
type SelectedFilter = 'type' | 'categories' | 'paymentModes';
export type SelectedFilters = {
  type: TRANSACTION_TYPE | undefined,
  categories: string[]
  paymentModes: string[]
}

interface Props {
  isLoading: boolean;
  isFilterSelected: boolean;
  isStaleCategories: boolean;
  setIsStaleCategories: (v: boolean) => void;
  setIsStalePaymentModes: (v: boolean) => void;
  isStalePaymentModes: boolean;

  selectedFilters : SelectedFilters;
  setFilter: (filter: SelectedFilter, selectedOptions: TRANSACTION_TYPE | string[] | undefined) => void;
}

const OPTIONS_WRAPPER_HEIGHT = 300 // Layout.window.height * 0.4;

export default function TransactionFilters({
    selectedFilters, setFilter, isFilterSelected, isLoading, isStaleCategories, isStalePaymentModes, setIsStaleCategories, setIsStalePaymentModes,
  }: Props) {
  const [visibleModal, setVisibleModal] = useState<FilterType>('NONE');
  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE | undefined>()
  const [options, setOptions] = useState<string[]>([]);
  
  // const [option, setOption] = useState<string>('');

  // const [availableCategories, , isCategoryLoading] = useStore('categories');
  // const [availablePModes, , isPModeLoading] = useStore('paymentModes');

  // @ts-ignore
  // const parsedCategories: CategoryOption[] = availableCategories !== '' ? parseObject(availableCategories) : [];

  // @ts-ignore
  // const parsedPModes: PaymentModeOption[] = availablePModes !== '' ? parseObject(availablePModes) : [];

  // useEffect(()=> {
  //   if(visibleModal === 'NONE') {
  //     setOptions([]);
  //     setOption('');
  //   } else if(visibleModal === 'TRANSACTION_TYPE') {
  //     setOption(selectedFilters.transactionType)
  //   } else if(visibleModal === 'CATEGORY') {
  //     setOptions(selectedFilters.category)
  //   }else if(visibleModal === 'PAYMENT_MODE') {
  //     setOptions(selectedFilters.paymentMode)
  //   }
  // }, [visibleModal]);

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const { isLoading: isFetchCategoriesLoading, doApiCall: fetchCategories } = useApiCall({
    apiCall: () => getCategories(),
    onSuccess: (data) => {
      setCategories(data);
      setIsStaleCategories(false);
    }
  });

  const [paymentModes, setPaymentModes] = useState<PaymentModeOption[]>([]);
  const { isLoading: isFetchPaymentModesLoading, doApiCall: fetchPaymentModes } = useApiCall({
    apiCall: () => getPaymentModes(),
    onSuccess: (data) => {
      setPaymentModes(data);
      setIsStalePaymentModes(false);
    }
  });


  const _OnMultiFilterSelect = (op: { _id: string, name: string }) => {
    if(options.includes(op._id)) {
      setOptions(options.filter(o => o !== op._id));
    } else {
      setOptions([ ...options, op._id]);
    }
  }

  const closeModal = () => setVisibleModal('NONE');

  if (isLoading) {
    return (
      <LoadingSkeleton style={[styles.filterRow, { width: '100%' }]} itemStyle={{  marginLeft: 20 }}>
        <DefaultView style={{ width: 40, height: 30 }} />
        <DefaultView style={{ width: 100, height: 30 }} />
        <DefaultView style={{ width: 100, height: 30 }} />
        <DefaultView style={{ width: 100, height: 30 }} />
      </LoadingSkeleton>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.filterRow} horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ position: 'relative', marginHorizontal: 15, backgroundColor: 'transparent' }}>
        <Icon type="AntDesign" name='filter' size={30} />
        { isFilterSelected && <View style={styles.filterDot} /> }
      </View>
      <Dropdown
        key='transaction_type'
        style={selectedFilters.type ? [styles.filterSelect, styles.filterSelected] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Transaction Type'
        label={selectedFilters.type ? '1' : ''}
        labelStyles={styles.filterApplied}
        value={selectedFilters.type}
        onPress={() => setVisibleModal('TRANSACTION_TYPE')}
      />
      <Dropdown
        key='category'
        style={selectedFilters.categories.length !== 0 ? [styles.filterSelect, styles.filterSelected] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Category'
        value={selectedFilters.categories.length !== 0  ? 'Category' : ''}
        label={selectedFilters.categories.length !== 0  ? `${selectedFilters.categories.length}` : ''}
        labelStyles={styles.filterApplied}
        onPress={() => {
          if (isStaleCategories) {
            fetchCategories();
          }
          setVisibleModal('CATEGORY')
        }}
      />
      <Dropdown
        key='pMode'
        style={selectedFilters.paymentModes.length !== 0 ? [styles.filterSelect, styles.filterSelected] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Payment Mode'
        value={selectedFilters.paymentModes.length !== 0  ? 'Payment Mode' : ''}
        label={selectedFilters.paymentModes.length !== 0  ? `${selectedFilters.paymentModes.length}` : ''}
        labelStyles={styles.filterApplied}
        onPress={() => {
          if (isStalePaymentModes) {
            fetchPaymentModes();
          }
          setVisibleModal('PAYMENT_MODE')
        }}
      />
      <FilterModal
        title='Set Filter For Transaction Type'
        visible={visibleModal === 'TRANSACTION_TYPE'}
        onClose={closeModal}
        cancelText='Clear'
        onSubmit={() => {
          if (selectedFilters.type !== transactionType) {
            setFilter('type', transactionType)
          }
          closeModal();
        }}
        onCancel={() => {
          closeModal();
          if (selectedFilters.type !== undefined) {
            setFilter('type', undefined);
          }
        }}
      >
        <View style={styles.optionsWrapper}>
          <TouchableOpacity style={styles.filterOptionRow} onPress={() => setTransactionType(TRANSACTION_TYPE.INCOME)}>
            <RadioButton isSelected={transactionType === TRANSACTION_TYPE.INCOME} />
            <Text style={styles.filterOption}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOptionRow} onPress={() => setTransactionType(TRANSACTION_TYPE.EXPENSE)}>
            <RadioButton isSelected={transactionType === TRANSACTION_TYPE.EXPENSE} />
            <Text style={styles.filterOption}>Expense</Text>
          </TouchableOpacity>
        </View>
      </FilterModal>
      <FilterModal
        title='Set Filter For Category'
        visible={visibleModal === 'CATEGORY'}
        onClose={closeModal}
        onSubmit={() => {
          if (selectedFilters.categories !== options) {
            setFilter('categories', options)
          }
          closeModal();
        }}
        onCancel={() => {
          if (selectedFilters.categories.length !== 0) {
            setFilter('categories', []);
          }
          closeModal();
          setOptions([]);
        }}
      >
        <View style={styles.optionsWrapper}>
          <ScrollView>
            { isFetchCategoriesLoading
            ? <ModalListLoading /> //<ActivityIndicator size={'large'} style={{ height: OPTIONS_WRAPPER_HEIGHT }} />
            : categories.map((c, i)=> (
              <TouchableOpacity style={styles.filterOptionRow} activeOpacity={1} onPress={() => _OnMultiFilterSelect(c)} key={`${c.name}_${i}`}>
                <Checkbox isSelected={options.includes(c._id)} />
                <Text style={styles.filterOption}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </FilterModal>
      <FilterModal
        title='Set Filter For Payment Mode'
        visible={visibleModal === 'PAYMENT_MODE'}
        onClose={closeModal}
        onSubmit={() => {
          if (selectedFilters.paymentModes !== options) {
            setFilter('paymentModes', options)
          }
          closeModal();
        }}
        onCancel={() => {
          if (selectedFilters.paymentModes.length !== 0) {
            setFilter('paymentModes', []);
          }
          closeModal();
          setOptions([]);
        }}
      >
        <View style={styles.optionsWrapper}>
          <ScrollView>
            { isFetchPaymentModesLoading
            ? <ModalListLoading /> // <ActivityIndicator size={'large'} style={{ height: OPTIONS_WRAPPER_HEIGHT }} />
            : paymentModes.map((p, i)=> (
              <TouchableOpacity style={styles.filterOptionRow} activeOpacity={1} onPress={() => _OnMultiFilterSelect(p)} key={`${p.name}_${i}`}>
                <Checkbox isSelected={options.includes(p._id)} />
                <Text style={styles.filterOption}>{p.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </FilterModal>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    // backgroundColor: '#dadada', // 'rgba(96, 133, 214, 0.6)'
  },
  filterDot: {
    width: 12,
    height: 12,
    backgroundColor: 'red',
    position: 'absolute',
    left: 20,
    top: -2,
    borderRadius: 10,
  },
  filterSelect: {
    marginBottom: 0,
    height: 30,
    marginRight: 15,
  },
  filterSelected: {
    backgroundColor: 'rgba(96, 133, 214, 0.2)',
  },
  optionsWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    // backgroundColor: 'white',
    height: OPTIONS_WRAPPER_HEIGHT,
  },
  filterOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterOption: {
    marginLeft: 15,
    fontSize: 15,
    // color: 'black'
  },
  filterApplied: {
    backgroundColor: 'rgba(242, 7, 58, 1)',
    fontSize: 10,
    top: -8,
    left: 5,
    borderRadius: 20,
    color: 'white',
  },
});
