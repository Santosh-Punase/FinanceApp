import { useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, ColorSchemeName } from "react-native";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Option } from "../store/type";
import { useTheme } from "../theme";
import { FloatingButton } from "./FloatingButton";
import { Icon } from "./Icon";
import { InputModal } from "./Modals/InputModal";
import { NoRecord } from "./NoRecord";
import { RadioButton } from "./RadioButton";
import { View, Text } from "./Themed";

type OptionsListProps<T> = {
  isLoading: boolean;
  selectedOption: string;
  filteredRecords: T[];
  allRecords: T[];
  searchString: string;
  onSelect: (option: T) => void;
  onEdit: (option: T) => void;
  onAddNew: (name: string) => void;
  recordType: string
  recordPluralName: string;
  updateOptions: (options: T[]) => void
}

export function OptionList<T>({ isLoading, selectedOption, searchString, filteredRecords, onSelect, onAddNew, onEdit, recordPluralName, allRecords, updateOptions, recordType }: OptionsListProps<T>) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentTheme:ColorSchemeName = useTheme();
  const selectedOptionColor = Colors[currentTheme].selectedOption;
  const tintButton = Colors[currentTheme].tintButton;
  const [optionToEdit, setOptionToEdit] = useState<Option | null>(null);

  const optionsContainerBackgroundColor = Colors[currentTheme].background;
  const optionsContainerShadowColor = Colors[currentTheme].text;

  const createTwoButtonAlert = (optionName: string) =>
    Alert.alert(
      `Delete ${optionName} ?`,
      "Are you sure? This can't be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "YES",
          style: 'destructive',
          onPress: () => updateOptions(allRecords.filter(op => op.name !== optionName))
        }
      ],
      { cancelable: true, }
    );

  const editOption = (op) => {
    setOptionToEdit(op);
    setShowModal(true);
  }

  const onCancelModal = () => {
    setShowModal(false);
    setOptionToEdit(null);
  }

  const onSubmitModal = (name: string) => {
    if(optionToEdit) {
      onEdit({ ...optionToEdit, name, updatedAt: Date.now() })
      setOptionToEdit(null);
    } else {
      onAddNew(name);
    }
    setShowModal(false);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>{recordPluralName}</Text>
      </View>
      <ScrollView style={[{ width: '100%' }]}>
        { isLoading ? (
          <View style={{ height: Layout.window.height - 200, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View style={[{ width: '100%', paddingTop: 10, }]}>
            {filteredRecords.map((op: Option, i: number) => {
              const isSelected = selectedOption === op.name;
              return (
                <View style={isSelected ? [styles.listItem, { backgroundColor: selectedOptionColor }] : styles.listItem} key={i} darkColor={'rgba(255, 255, 255, 0.08)'} >
                  <TouchableOpacity onPress={() => onSelect(op)} style={styles.labelWrapper} activeOpacity={1}>
                    <RadioButton size={24} style={styles.radioIcon} isSelected={isSelected} />
                    <Text style={styles.optionLabel}>{op.name}</Text>
                  </TouchableOpacity>
                  <Menu style={styles.moreOptions}>
                    <MenuTrigger>
                      <Icon name="md-ellipsis-vertical" type='Ionicons' size={20} />
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{ padding: 5, shadowColor: optionsContainerShadowColor, backgroundColor: optionsContainerBackgroundColor }}>
                      <MenuOption onSelect={() => editOption(op)}>
                        <Text>Edit</Text>
                      </MenuOption>
                      <MenuOption onSelect={() => createTwoButtonAlert(op.name)} >
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
            header={`No ${recordType} Found`}
            subHeader="Try searching with different name or add new"
          />
        )}
      </ScrollView>
      <FloatingButton onPress={() => setShowModal(true)} label={'+'} style={{ bottom: 40, right: 20, backgroundColor: tintButton }}/>
      { showModal && (
        <InputModal
          title={optionToEdit ? `Edit ${recordType}`: `Add New ${recordType}`}
          initialValue={optionToEdit?.name || ''}
          placeholder={recordType}
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
