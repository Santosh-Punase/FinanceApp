import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { Dropdown } from '../Dropdown';
import { Text, View } from '../Themed';
import { FilterModal } from '../Modals/FilterModal';
import { Checkbox, RadioButton } from '../RadioButton';
import useStore from '../../hooks/useStore';
import { Option } from '../../store/type';
import { parseObject } from '../../utils';
import Layout from '../../constants/Layout';

export type FilterType = 'TRANSACTION_TYPE' | 'CATEGORY' | 'PAYMENT_MODE' | 'NONE';
export type SelectedFilters = {
  TRANSACTION_TYPE: string,
  CATEGORY: string[]
  PAYMENT_MODE: string[]
}

interface Props {
  selectedFilters : SelectedFilters;
  setFilter: (filter: FilterType, selectedOptions: string | string[]) => void;
}

export default function TransactionFilters({ selectedFilters, setFilter }: Props) {
  const [visibleModal, setVisibleModal] = useState<FilterType>('NONE');
  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState<string>('');

  const [availableCategories, , isCategoryLoading] = useStore('categories');
  const [availablePModes, , isPModeLoading] = useStore('paymentModes');

  // @ts-ignore
  const parsedCategories: Option[] = availableCategories !== '' ? parseObject(availableCategories) : [];

  // @ts-ignore
  const parsedPModes: Option[] = availablePModes !== '' ? parseObject(availablePModes) : [];

  useEffect(()=> {
    if(visibleModal === 'NONE') {
      setOptions([]);
      setOption('');
    } else if(visibleModal === 'TRANSACTION_TYPE') {
      setOption(selectedFilters.TRANSACTION_TYPE)
    } else (
      setOptions(selectedFilters[visibleModal])
    )
  }, [visibleModal]);

  const _OnFilterSelect = (op: string) => {
    setOption(op)
  }

  const _OnMultiFilterSelect = (op: string) => {
    if(options.includes(op)) {
      setOptions(options.filter(o => o!== op));
    } else {
      setOptions([ ...options, op]);
    }
  }

  const onClearAll = () => {
    setOption('');
    setOptions([]);
  }

  const onCloseModal = () => setVisibleModal('NONE');

  const onApplyFilter = (filters: string | string[]) => {
    setFilter(visibleModal, filters);
    setVisibleModal('NONE');
  }

  return (
    <ScrollView contentContainerStyle={styles.filterRow} horizontal showsHorizontalScrollIndicator={false}>
      <AntDesign name='filter' size={30} style={{ marginHorizontal: 15, }} />
      <Dropdown
        key='transaction_type'
        style={styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Transaction Type'
        value={selectedFilters.TRANSACTION_TYPE}
        onPress={() => setVisibleModal('TRANSACTION_TYPE')}
      />
      <Dropdown
        key='category'
        style={selectedFilters.CATEGORY.length !== 0 ? [styles.filterSelect, { }] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Category'
        value={selectedFilters.CATEGORY.length !== 0  ? 'Category' : ''}
        label={selectedFilters.CATEGORY.length !== 0  ? `${selectedFilters.CATEGORY.length}` : ''}
        labelStyles={styles.filterApplied}
        onPress={() => setVisibleModal('CATEGORY')}
      />
      <Dropdown
        key='pMode'
        style={selectedFilters.PAYMENT_MODE.length !== 0 ? [styles.filterSelect, { }] : styles.filterSelect}
        iconStyle={{ size: 15 }}
        placeholder='Payment Mode'
        value={selectedFilters.PAYMENT_MODE.length !== 0  ? 'Payment Mode' : ''}
        label={selectedFilters.PAYMENT_MODE.length !== 0  ? `${selectedFilters.PAYMENT_MODE.length}` : ''}
        labelStyles={styles.filterApplied}
        onPress={() => setVisibleModal('PAYMENT_MODE')}
      />
      <FilterModal
        title='Set Filter For Transaction Type'
        visible={visibleModal === 'TRANSACTION_TYPE'}
        onClose={onCloseModal}
        onSubmit={() => onApplyFilter(option)}
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
        onSubmit={() => onApplyFilter(options)}
        onCancel={onClearAll}
      >
        <ScrollView style={styles.optionsWrapper}>
          { parsedCategories.map((c, i)=> (
            <TouchableOpacity style={styles.filterOptionRow} onPress={() => _OnMultiFilterSelect(c.name)} key={c.name}>
              <Checkbox isSelected={options.includes(c.name)} />
              <Text style={styles.filterOption}>{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </FilterModal>
      <FilterModal
        title='Set Filter For Payment Mode'
        visible={visibleModal === 'PAYMENT_MODE'}
        onClose={onCloseModal}
        onSubmit={() => onApplyFilter(options)}
        onCancel={onClearAll}
      >
        <ScrollView style={styles.optionsWrapper}>
          { parsedPModes.map((p, i)=> (
            <TouchableOpacity style={styles.filterOptionRow} onPress={() => _OnMultiFilterSelect(p.name)} key={p.name}>
              <Checkbox isSelected={options.includes(p.name)} />
              <Text style={styles.filterOption}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </FilterModal>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    backgroundColor: '#dadada', // 'rgba(96, 133, 214, 0.6)'
  },
  filterSelect: {
    marginBottom: 0,
    height: 30,
    marginRight: 15,
  },
  optionsWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: 'white',
    maxHeight: Layout.window.height * 0.4,
  },
  filterOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterOption: {
    marginLeft: 15,
    fontSize: 15,
    color: 'black'
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
