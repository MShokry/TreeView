import React, {useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
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
