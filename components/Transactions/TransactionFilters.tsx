import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import { Dropdown } from '../Dropdown';
import { Text, View } from '../Themed';
import { FilterModal } from '../Modals/FilterModal';
import { Checkbox, RadioButton } from '../RadioButton';
import useStore from '../../hooks/useStore';
import { CategoryOption, DropdownOption, PaymentModeOption } from '../../store/type';
import { parseObject } from '../../utils';
import Layout from '../../constants/Layout';
import { Icon } from '../Icon';

export type FilterType = 'TRANSACTION_TYPE' | 'CATEGORY' | 'PAYMENT_MODE' | 'NONE';
type SelectedFilter = 'transactionType' | 'category' | 'paymentMode';
export type SelectedFilters = {
  transactionType: string,
  category: number[]
  paymentMode: number[]
}

interface Props {
  selectedFilters : SelectedFilters;
  setFilter: (filter: SelectedFilter, selectedOptions: string | number[]) => void;
}

const OPTIONS_WRAPPER_HEIGHT = Layout.window.height * 0.4;

export default function TransactionFilters({ selectedFilters, setFilter }: Props) {
  const [visibleModal, setVisibleModal] = useState<FilterType>('NONE');
  const [options, setOptions] = useState<number[]>([]);
  const [option, setOption] = useState<string>('');

  const [availableCategories, , isCategoryLoading] = useStore('categories');
  const [availablePModes, , isPModeLoading] = useStore('paymentModes');

  // @ts-ignore
  const parsedCategories: CategoryOption[] = availableCategories !== '' ? parseObject(availableCategories) : [];

  // @ts-ignore
  const parsedPModes: PaymentModeOption[] = availablePModes !== '' ? parseObject(availablePModes) : [];

  useEffect(()=> {
    if(visibleModal === 'NONE') {
      setOptions([]);
      setOption('');
    } else if(visibleModal === 'TRANSACTION_TYPE') {
      setOption(selectedFilters.transactionType)
    } else if(visibleModal === 'CATEGORY') {
      setOptions(selectedFilters.category)
    }else if(visibleModal === 'PAYMENT_MODE') {
      setOptions(selectedFilters.paymentMode)
    }
  }, [visibleModal]);

  const _OnFilterSelect = (op: string) => {
    setOption(op)
  }

  const _OnMultiFilterSelect = (op: DropdownOption) => {
    if(options.includes(op.id)) {
      setOptions(options.filter(o => o!== op.id));
    } else {
      setOptions([ ...options, op.id]);
    }
  }

  const onClearAll = () => {
    setOption('');
    setOptions([]);
  }

  const onCloseModal = () => setVisibleModal('NONE');

  const onApplyFilter = (filter: SelectedFilter, filters: string | number[]) => {
    setFilter(filter, filters);
    setVisibleModal('NONE');
  }

  const isFilterSelected = selectedFilters.category.length > 0 || selectedFilters.paymentMode.length > 0 || selectedFilters.transactionType !== '';

  return (
    <ScrollView contentContainerStyle={styles.filterRow} horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ position: 'relative', marginHorizontal: 15 }} darkColor='rgba(0, 0, 0, 0.08)'>
        <Icon type="AntDesign" name='filter' size={30} />
        { isFilterSelected && <View style={styles.filterDot} /> }
      </View>
      <Dropdown
        key='transaction_type'
        style={selectedFilters.transactionType ? [styles.filterSelect, styles.filterSelected] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Transaction Type'
        label={selectedFilters.transactionType ? '1' : ''}
        labelStyles={styles.filterApplied}
        value={selectedFilters.transactionType}
        onPress={() => setVisibleModal('TRANSACTION_TYPE')}
      />
      <Dropdown
        key='category'
        style={selectedFilters.category.length !== 0 ? [styles.filterSelect, styles.filterSelected] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Category'
        value={selectedFilters.category.length !== 0  ? 'Category' : ''}
        label={selectedFilters.category.length !== 0  ? `${selectedFilters.category.length}` : ''}
        labelStyles={styles.filterApplied}
        onPress={() => setVisibleModal('CATEGORY')}
      />
      <Dropdown
        key='pMode'
        style={selectedFilters.paymentMode.length !== 0 ? [styles.filterSelect, styles.filterSelected] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Payment Mode'
        value={selectedFilters.paymentMode.length !== 0  ? 'Payment Mode' : ''}
        label={selectedFilters.paymentMode.length !== 0  ? `${selectedFilters.paymentMode.length}` : ''}
        labelStyles={styles.filterApplied}
        onPress={() => setVisibleModal('PAYMENT_MODE')}
      />
      <FilterModal
        title='Set Filter For Transaction Type'
        visible={visibleModal === 'TRANSACTION_TYPE'}
        onClose={onCloseModal}
        onSubmit={() => onApplyFilter('transactionType', option)}
        onCancel={onClearAll}
      >
        <View style={styles.optionsWrapper}>
          <TouchableOpacity style={styles.filterOptionRow} onPress={() => _OnFilterSelect('Cash-In')}>
            <RadioButton isSelected={option === 'Cash-In'} />
            <Text style={styles.filterOption}>CASH IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOptionRow} onPress={() => _OnFilterSelect('Cash-Out')}>
            <RadioButton isSelected={option === 'Cash-Out'} />
            <Text style={styles.filterOption}>CASH OUT</Text>
          </TouchableOpacity>
        </View>
      </FilterModal>
      <FilterModal
        title='Set Filter For Category'
        visible={visibleModal === 'CATEGORY'}
        onClose={onCloseModal}
        onSubmit={() => onApplyFilter('category', options)}
        onCancel={onClearAll}
      >
        <View style={styles.optionsWrapper}>
          <ScrollView>
            { isCategoryLoading
            ? <ActivityIndicator size={'large'} style={{ height: OPTIONS_WRAPPER_HEIGHT }} />
            : parsedCategories.map((c, i)=> (
              <TouchableOpacity style={styles.filterOptionRow} activeOpacity={1} onPress={() => _OnMultiFilterSelect(c)} key={`${c.name}_${i}`}>
                <Checkbox isSelected={options.includes(c.id)} />
                <Text style={styles.filterOption}>{c.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </FilterModal>
      <FilterModal
        title='Set Filter For Payment Mode'
        visible={visibleModal === 'PAYMENT_MODE'}
        onClose={onCloseModal}
        onSubmit={() => onApplyFilter('paymentMode', options)}
        onCancel={onClearAll}
      >
        <View style={styles.optionsWrapper}>
          <ScrollView>
            { isPModeLoading
            ? <ActivityIndicator size={'large'} style={{ height: OPTIONS_WRAPPER_HEIGHT }} />
            : parsedPModes.map((p, i)=> (
              <TouchableOpacity style={styles.filterOptionRow} activeOpacity={1} onPress={() => _OnMultiFilterSelect(p)} key={`${p.name}_${i}`}>
                <Checkbox isSelected={options.includes(p.id)} />
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
    backgroundColor: 'rgba(96, 133, 214, 0.1)',
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
