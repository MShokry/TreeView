import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';

import _ from 'lodash';
import {getChildsNames, getNames, onClear, onSelect, onUnSelect} from 'utils/treeUtils';
import Tree from 'components/Tree';
import {styles} from './style';

import {products} from 'api/products';

let selectItem = [];

export default function Filter({textField = 'name', childField = 'childs'}) {
  // const [listData] = useState(JSON.parse(JSON.stringify(products))); // if lodash not installed
  const [listData] = useState(_.cloneDeep(products));
  const [timeStamp, setTimeStamp] = useState(Math.random());
  const [selected, setSelected] = useState([]);

  const clearAll = () => {
    onClear(listData);
    reload();
  };

  const reload = () => {
    setTimeStamp(Math.random());
    selectItem = [];
    getSelected(listData);
  };

  const getSelected = items => {
    items?.forEach(child => {
      if (child?.selected) {
        selectItem.push(child);
      } else {
        child?.[childField] && getSelected(child[childField]);
      }
    });
  };

  useEffect(() => {
    if (!!!selectItem) {
      setSelected([]);
      return;
    }
    const selectedItem = _.cloneDeep(selectItem).map(e => {
      e.isParent = !!e?.[childField];
      e.parentName = e.parent?.name;
      delete e.parent;
      delete e?.[childField];
      delete e.show;
      delete e.tick;
      return e;
    });
    setSelected(selectedItem);
  }, [selectItem]);

  const onItemPressed = item => {
    const p1 = performance.now();
    if (!item.selected) {
      onSelect(item, childField);
    } else {
      onUnSelect(item, childField);
    }
    reload();
    const p2 = performance.now();
    console.log(`Call to onItemPressed took ${p2 - p1} milliseconds.`);
  };

  const _renderSelected = () => {
    if (!selected.length) {
      return null;
    }
    const c = Object.entries(getNames(selected));
    return c.map(([key, value], idx) => (
      <View key={`${idx}`} style={styles.tags}>
        {/* <Text>test</Text> */}
        <Text>{!value.data ? `all ${key} devices` : `${key} ${getChildsNames(value.data)}`}</Text>
      </View>
    ));
  };

  return (
    <View>
      <View style={{height: '95%'}}>
        <Tree onItemPressed={onItemPressed} listData={listData} />
      </View>
      <ScrollView horizontal style={{height: '4%'}}>
        {!!selected && _renderSelected()}
      </ScrollView>
    </View>
  );
}
