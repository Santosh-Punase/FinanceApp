import { useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";

import Layout from "../constants/Layout";
import { Option } from "../store/type";
import { useTheme } from "../theme";
import { FloatingButton } from "./FloatingButton";
import { NoRecord } from "./NoRecord";
import { OverlayModal } from "./OverlayModal";
import { RadioButton } from "./RadioButton";
import { View, Text } from "./Themed";

type OptionsListProps = {
  isLoading: boolean;
  selectedOption: string;
  filteredRecords: Option[];
  allRecords: Option[];
  searchString: string;
  onSelect: (option: Option) => void;
  onAddNew: (name: string) => void;
  recordType: string
  recordPluralName: string;
  updateOptions: (options: Option[]) => void
}

export function OptionsList({ isLoading, selectedOption, searchString, filteredRecords, onSelect, onAddNew, recordPluralName, allRecords, updateOptions, recordType }: OptionsListProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const currentTheme:ColorSchemeName = useTheme();
  const selectedOptionColor = Colors[currentTheme].selectedOption;
  const tintButton = Colors[currentTheme].tintButton;

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
                <View style={isSelected ? [styles.listItem, { backgroundColor: selectedOptionColor }] : styles.listItem} key={i} >
                  <TouchableOpacity onPress={() => onSelect(op)} style={styles.labelWrapper} activeOpacity={1}>
                    <RadioButton size={24} style={styles.radioIcon} isSelected={isSelected} />
                    <Text style={styles.optionLabel}>{op.name}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => createTwoButtonAlert(op.name)}>
                    <Text style={styles.closeIcon}>+</Text>
                  </TouchableOpacity>
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
      <OverlayModal
        title={`Add New ${recordType}`}
        placeholder={recordType}
        submitText='Save'
        visible={showModal}
        onSubmit={(text) => {
          onAddNew(text)
          setShowModal(false)
        }}
        onCancel={() => setShowModal(false)}
      />
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
  closeIcon: {
    paddingHorizontal: 10,
    height: 50,
    textAlignVertical: 'center',
    fontSize: 30,
    color: 'red',
    transform: [{ rotateZ: '45deg' }]
  },
  optionLabel: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    textAlignVertical: 'center',
  },
});
