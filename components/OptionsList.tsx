import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from "react-native";

import Layout from "../constants/Layout";
import { Option } from "../store/type";
import { FloatingButton } from "./FloatingButton";
import { OverlayModal } from "./OverlayModal";
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
            {filteredRecords.map((op: Option, i: number) => (
              <View style={styles.listItem} key={i} >
                { selectedOption === op.name
                  ? <Ionicons name="radio-button-on" size={24} style={styles.radioIcon} color="blue" />
                  : <Ionicons name="radio-button-off" size={24} style={styles.radioIcon} color="black" />
                }
                <TouchableOpacity onPress={() => onSelect(op)}>
                  <Text style={styles.category}>{op.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createTwoButtonAlert(op.name)}>
                  <Text style={styles.closeIcon}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
            { searchString && (
              <TouchableOpacity style={[styles.row, { borderRadius: 8, }]} onPress={() => onAddNew(searchString)}>
                <Text style={[styles.category, { color: 'blue' }]}> + Add {searchString}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        { filteredRecords.length === 0 && (
          <View style={styles.noResult}>
            <Text style={styles.noResultHeader}>{`No ${recordPluralName} Found`}</Text>
            <Text style={styles.noResultSubHeader}>Try searching with different name or add new</Text>
          </View>
        )}
      </ScrollView>
      <FloatingButton onPress={() => setShowModal(true)} label={'+'} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 16,
    borderRadius: 8,
  },
  radioIcon: {
    marginVertical: 'auto',
    paddingLeft: 16,
  },
  closeIcon: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    textAlignVertical: 'center',
    fontSize: 30,
    color: 'red',
    transform: [{ rotateZ: '45deg' }]
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    height: 50,
    width: Layout.window.width - 100,
    textAlignVertical: 'center',
  },
  noResult: {
    height: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultHeader: {
    fontSize: 22,
  },
  noResultSubHeader: {
    fontSize: 14,
    marginTop: 10,
  },
});
