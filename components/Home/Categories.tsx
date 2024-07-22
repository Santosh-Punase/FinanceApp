import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View as DefaultView } from 'react-native';

import Colors from "../../constants/Colors";
import { WIDTH } from "../../constants/Layout";
import { StyleTheme } from "../../store/type";
import { getProgressColor } from "../../utils";
import { ButtonLink } from "../Button";
import { Card } from "../Card";
import { HorizontalCardList } from "../HorizontalCardList";
// import { Icon } from "../Icon";
import { LinearGradient, Text, View } from "../Themed";
import { styles } from "./styles";
import { HomeScreenNavigation } from "../../types";
import { LoadingSkeleton } from "../LoadingSkeleton";
import useApiCall from "../../hooks/useApiCall";
import { getCategories } from "../../api/api";
interface Props {
  navigation: HomeScreenNavigation;
  currentTheme: StyleTheme
}

export function Categories({ navigation, currentTheme }: Props) {
  const [categories, setCategories] = useState([]);
  const { isLoading, doApiCall: fetchCategories } = useApiCall({
    apiCall: () => getCategories(),
    onSuccess: (data) => {
      setCategories(data);
    }
  });

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  if (isLoading) {
    return (
      <Card style={[styles.cardStyle, { marginBottom: 10, minHeight: 240, justifyContent: 'center' }]}>
        <DefaultView style={{ width: WIDTH - 40, minHeight: 180 }}>
          <LoadingSkeleton style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} itemStyle={{ marginBottom: 10 }}>
            <DefaultView style={{ width: 100, height: 20 }}/>
            <DefaultView style={{ width: 100, height: 20 }}/>
          </LoadingSkeleton>
          <LoadingSkeleton itemStyle={{ marginBottom: 10 }}>
            <DefaultView style={{ width: 60, height: 180 }}/>
          </LoadingSkeleton>
        </DefaultView>
      </Card>
    )
  }
  return (
    <Card style={[styles.cardStyle, { marginBottom: 10, minHeight: 240 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: WIDTH - 40 , alignItems: 'center', height: 40 }}>
        <Text style={[styles.header, { marginLeft: 0 }]}>Budget Overview</Text>
        <ButtonLink
          label='+ Add Category'
          onPress={() => navigation.navigate('AddCategoryScreen', { header: 'Add Category', category: undefined, action: 'Add' })}
        />
      </View>
      <HorizontalCardList
        data={categories}
        style={{ maxHeight: 200, minHeight: 200 }}
        renderItem={({ item: { name, budget, expenditure } }) => {
          // console.log('item', name,expenditure, budget)
          const expenseMultiple = expenditure/budget;
          const spentPercent = (expenseMultiple * 100).toFixed(0);
          const progressBarColor = getProgressColor(expenseMultiple);

          return (
            <View
              style={{
                flex: 1,
                height: 150,
                width: categories.length === 1
                  ? WIDTH * 0.90 - 20 // (WIDTH - 40) / categories.length - 20
                  :  WIDTH * 0.75 - 10,
                borderRadius: 10,
                alignSelf: 'center',
                marginHorizontal: 10
              }}
            >
              <LinearGradient colors={Colors.categoryCardGradiant} style={{ height: '100%', width: '100%', borderRadius: 10, padding: 20, position: 'relative' }}>
                <Text style={{ textAlign: 'left', fontSize: 24, color: '#fff' }}>
                  {name}
                </Text>
                {/* <Icon type='FontAwesome' name='money-bill-wave' size={100} color='white' style={{ position: 'absolute', left: '40%', top: '20%', opacity: 0.1 }}/> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: 'transparent' }}>
                  <Text style={{ marginBottom: 5, fontSize: 16, color: '#fff' }}>
                    {expenditure}
                  </Text>
                  <Text style={{ marginBottom: 5, fontSize: 16, color: '#fff' }}>
                    {budget}
                  </Text>
                </View>
                <View style={{ height: 10, borderRadius: 8, marginBottom: 5, backgroundColor: Colors[currentTheme].progressBG }}>
                  <View style={{ height: 10, borderRadius: 8, opacity: 0.8, backgroundColor: progressBarColor, width: `${expenseMultiple < 1 ? expenseMultiple * 100 : 100}%` }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                  <Text style={{ marginBottom: 5, fontSize: 12, color: '#fff' }}>
                    {`${spentPercent}% Spent`}
                  </Text>
                  <Text style={{ marginBottom: 5, fontSize: 12, color: '#fff' }}>
                    Budget
                  </Text>
                </View>
              </LinearGradient>
            </View>
          )}
        }
      />
      { categories.length === 0 && (
        <View
          style={{
            flex: 1,
            maxHeight: 150, minHeight: 150,
            marginTop: 20, 
            width: WIDTH - 60,
            borderRadius: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            // padding: 10,
            marginHorizontal: 10
          }}
        >
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ height: '100%', width: '100%', borderRadius: 10, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
              Set budget for your expenses
            </Text>
            <Text style={{ textAlign: 'center', fontSize: 14, color: '#fff' }}>
              Add categories to get started.
            </Text>
          </LinearGradient>
        </View>
      )}
    </Card>
  )
}
