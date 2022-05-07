import React from 'react';
import {View, SafeAreaView} from 'react-native';
import Filter from 'containers/Filter';

import {products} from 'api/products';

export default function index() {
  return (
    <View>
      <SafeAreaView>
        <Filter products={products} />
      </SafeAreaView>
    </View>
  );
}
