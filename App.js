import React, {useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import Filter from 'containers/Filter';
import {products} from 'api/products';

const textField = 'name';
const childField = 'childs';

export default function index() {
  const [selected, setSelected] = useState([]);

  const _renderSelected = () => {
    if (!selected.length) {
      return null;
    }
    const getChilds = item => {
      return (item?.map(e => e[textField]) || []).join(', ');
    };

    const categories =
      selected.reduce((acc, item) => {
        if (item.isParent) {
          acc[item[textField]] ??= {...item};
        } else {
          (acc[item.parentName] ??= {isParent: false, data: []}).data.push({...item});
        }
        return acc;
      }, {}) || [];
    const c = Object.entries(categories);
    return c.map(([key, value], idx) => (
      <View
        key={`${idx}`}
        style={{
          backgroundColor: '#ccc',
          paddingHorizontal: 10,
          marginHorizontal: 5,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <Text>test</Text> */}
        <Text>{!value.data ? `all ${key} devices` : `${key} ${getChilds(value.data)}`}</Text>
        {/* <Text>{!value.data ? `all ${key} devices` : `${key} ${value.join(',')}`}</Text> */}
      </View>
    ));
  };

  return (
    <View>
      <SafeAreaView>
        <View style={{height: '95%'}}>
          <Filter setSelect={setSelected} products={products} />
        </View>
        <ScrollView horizontal style={{height: '4%'}}>
          {!!selected && _renderSelected()}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
