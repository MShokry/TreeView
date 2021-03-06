import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';

import CHECK from 'assets/svg/icon-checklist.svg';
import UNCHECK from 'assets/svg/uncheck.svg';
import ARROW from 'assets/svg/arrow.svg';

import _ from 'lodash';

const checkSize = 26;
let selectItem = [];

export default function Tree({
  listData,
  setSelect = () => {},
  textField = 'name',
  childField = 'childs',
  Check = CHECK,
  Uncheck = UNCHECK,
  renderText,
  onItemPressed,
}) {
  const [timeStamp, setTimeStamp] = useState(Math.random());

  const reload = () => {
    setTimeStamp(Math.random());
    selectItem = [];
    // getSelected(listData);
  };
  useEffect(() => {
    if (!!!selectItem) {
      setSelect([]);
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
    setSelect(selectedItem);
  }, [selectItem]);

  const showChild = item => {
    item.show = !item.show;
    reload();
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
          {childs?.length > 0 ? (
            <TouchableOpacity style={[styles.buttonShow]} onPress={() => showChild(item)}>
              {item.show ? <ARROW style={styles.arrowDown} /> : <ARROW style={styles.arrowClose} />}
            </TouchableOpacity>
          ) : (
            <Text style={{width: checkSize}}>{`  `}</Text>
          )}
          <TouchableOpacity style={{flex: 1, flexDirection: 'row'}} onPress={() => onItemPressed(item)}>
            {item.selected ? <Check style={{width: checkSize}} /> : <Uncheck style={{width: checkSize}} />}
            {renderText ? (
              renderText()
            ) : (
              <View style={{flex: 1}}>
                <View style={styles.center}>
                  <Text style={[styles.name]} numberOfLines={3}>
                    {item[textField]}
                  </Text>
                </View>
                <Text style={[styles.subName]}>{item.devices}+ devices</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {item?.show && (
          <View>
            {childs?.map((data, index) => {
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
