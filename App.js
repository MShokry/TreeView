import React, {useState} from 'react';
import {View, Text} from 'react-native';

import Filter from 'containers/Filter';
import {products} from 'api/products';



export default function index() {

  return (
    <View>
        <Filter products={products} />
    </View>
  );
}
