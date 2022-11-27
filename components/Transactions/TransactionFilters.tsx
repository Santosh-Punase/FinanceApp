import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Dropdown } from '../Dropdown';
import { TransactionType } from '../../store/type';
import { Text, View } from '../Themed';
import { FilterModal } from '../Modals/FilterModal';
import { RadioButton } from '../RadioButton';

export type FilterType = 'TRANSACTION_TYPE';

interface Props {
  selectedFilters : {
    TRANSACTION_TYPE: string,
  },
  setFilter: (filter: string, selectedOptions: string | string[]) => void
}

export default function TransactionFilters({ selectedFilters, setFilter }: Props) {
  const [visibleModal, setVisibleModal] = useState<FilterType | 'NONE'>('NONE');
  // const [options, setOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<string>('');

  useEffect(()=> {
    if(visibleModal === 'NONE') {
      // setOptions([]);
      setOptions('');
    } else {
      setOptions(selectedFilters.TRANSACTION_TYPE)
    }
  }, [visibleModal]);

  const _OnFilterSelect = (op: TransactionType) => {
    // if(options.includes(op)) {
    //   setOptions(options.filter(o => o!== op));
    // } else {
    //   setOptions([ ...options, op]);
    // }
    setOptions(op)
  }

  const onClearAll = () => {
    setOptions('');
  }

  const onApplyFilter = () => {
    setFilter(visibleModal, options);
    setVisibleModal('NONE');
  }

  return (
    <View style={styles.filterRow}>
      <AntDesign name='filter' size={30} style={{ marginRight: 10, }}/>
      <Dropdown
        style={styles.filterSelect}
        iconStyle={styles.filterDropdownIcon}
        placeholder='Transaction Type'
        value={selectedFilters.TRANSACTION_TYPE}
        onPress={() => setVisibleModal('TRANSACTION_TYPE')}
      />
      <FilterModal
        title='Set Filter For Transaction Type'
        visible={visibleModal === 'TRANSACTION_TYPE'}
        onClose={() => setVisibleModal('NONE')}
        onSubmit={onApplyFilter}
        onCancel={onClearAll}
      >
        <View style={styles.optionsWrapper}>
          <TouchableOpacity style={styles.filterOptionRow} onPress={() => _OnFilterSelect('Cash-In')}>
            <RadioButton isSelected={options === 'Cash-In'} />
            <Text style={styles.filterOption}>CASH IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterOptionRow} onPress={() => _OnFilterSelect('Cash-Out')}>
            <RadioButton isSelected={options === 'Cash-Out'} />
            <Text style={styles.filterOption}>CASH OUT</Text>
          </TouchableOpacity>
        </View>
      </FilterModal>
  </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dadada', // 'rgba(96, 133, 214, 0.6)'
  },
  filterSelect: {
    alignSelf: 'center',
    marginBottom: 0,
    height: 30,
    paddingTop: 4,
    paddingRight: 30,
  },
  filterDropdownIcon: {
    top: 7.5,
    right: 10,
    height: 10,
    width: 10,
  },
  optionsWrapper: {
    paddingHorizontal: 15,
    marginBottom: 20,
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
});
