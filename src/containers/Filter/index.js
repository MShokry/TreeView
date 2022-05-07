import React, {useState} from 'react';
import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';

import _ from 'lodash';

const textField = 'name';
const checkSize = 26;
const childField = 'childs';

export default function Filter({products}) {
  // const [listData] = useState(JSON.parse(JSON.stringify(products))); // if lodash not installed
  const [listData] = useState(_.cloneDeep(products));
  const [timeStamp, setTimeStamp] = useState(Math.random());

  const reload = () => {
    setTimeStamp(Math.random());
  };

  const onSelect = (item, level) => {
    item.selected = true;
    item?.[childField] && item[childField].map(child => onSelect(child));
    item?.parent && refrehParent(item.parent);
    reload();
  };

  const onUnSelect = (item, level) => {
    item.selected = false;
    item?.[childField] && item[childField].map(child => onUnSelect(child));
    item?.parent && refrehParent(item.parent);
    reload();
  };

  const showChild = item => {
    item.show = !item.show;
    reload();
  };

  const refrehParent = item => {
    if (item?.[childField]) {
      const notSelected = item[childField].filter(child => !child.selected);
      if (notSelected.length === 0) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      item?.parent && refrehParent(item.parent);
    }
  };

  const onItemPressed = item => {
    const p1 = performance.now();
    if (!item.selected) {
      onSelect(item);
    } else {
      onUnSelect(item);
    }
    const p2 = performance.now();
    console.log(`Call to onItemPressed took ${p2 - p1} milliseconds.`);
  };

  const renderList = (item, childs, level) => {
    if (!item.selected) {
      item.selected = false;
    }
    if (!item.show) {
      item.show = false;
    }
    return (
      <View style={[styles.item, {marginLeft: checkSize}]} key={item.id}>
        <View style={styles.rowItem}>
          {childs && childs.length > 0 ? (
            <TouchableOpacity onPress={() => showChild(item)}>
              <Text style={styles.name}>{item.show ? '-' : '+'}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{width: checkSize}}>{`  `}</Text>
          )}
          <TouchableOpacity style={{flex: 1}} onPress={() => onItemPressed(item)}>
            <View style={styles.center}>
              <Text style={[styles.name, item.selected ? {color: 'red'} : {}]} numberOfLines={3}>
                {item[textField]}
              </Text>
            </View>
            <Text>
              {'   '}We have {item.devices}+ devices
            </Text>
          </TouchableOpacity>
        </View>

        {item.show && (
          <View>
            {childs &&
              childs.map((data, index) => {
                if (!data.parent) {
                  data.parent = item;
                }
                return renderList(data, data[childField], level + 1);
              })}
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={listData}
          renderItem={({item, index}) => renderList(item, item[childField], 0)}
          keyExtractor={(item, index) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          extraData={timeStamp}
          ListFooterComponentStyle={{paddingBottom: 40}}
        />
      </SafeAreaView>
    </View>
  );
}
