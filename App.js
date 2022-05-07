import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Filter from 'containers/Filter';

export default function index() {
  return (
    <View>
      <SafeAreaView>
        <Filter />
      </SafeAreaView>
    </View>
  );
}
