/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {getChildsNames, getNames, getSelected, onClear, onSelect, onUnSelect} from 'utils/treeUtils';
import {sample} from 'utils/sample';
import {keys, values} from 'lodash';

const textField = 'name';
const childField = 'childs';

it('Empty at start onSelect', () => {
  expect(sample[1][childField][1][childField][1].selected).toEqual(undefined);
});

it('onSelect element', () => {
  onSelect(sample[1][childField][1][childField][1]);
  expect(sample[1][childField][1][childField][1].selected).toEqual(true);
});

it('Is childs selected', () => {
  expect(sample[1][childField][1][childField][1][childField][0].selected).toEqual(true);
  expect(sample[1][childField][1][childField][1][childField][1].selected).toEqual(true);
});

it('onUnSelect element', () => {
  onUnSelect(sample[1][childField][1][childField][1]);
  expect(sample[1][childField][1][childField][1].selected).toEqual(false);
});

it('Is all childs un selected', () => {
  expect(sample[1][childField][1][childField][1][childField][0].selected).toEqual(false);
  expect(sample[1][childField][1][childField][1][childField][1].selected).toEqual(false);
});

it('onSelect element is child of child selected', () => {
  onSelect(sample[1]);
  expect(sample[1].selected).toEqual(true);
  expect(sample[1][childField][1][childField][1].selected).toEqual(true);
});

it('onClear all ', () => {
  onClear(sample);
  expect(sample[0].selected).toEqual(false);
  expect(sample[1].selected).toEqual(false);
  expect(sample[1][childField][1][childField][1].selected).toEqual(false);
});

it('select Parent if all childs selected', () => {
  sample[0][childField][0].parent = sample[0];
  sample[0][childField][1].parent = sample[0];
  onSelect(sample[0][childField][0]);
  expect(sample[0][childField][0].selected).toEqual(true);
  expect(sample[0].selected).toEqual(false);
  onSelect(sample[0][childField][1]);
  expect(sample[0][childField][1].selected).toEqual(true);
  expect(sample[0].selected).toEqual(true);
});

it('un select Parent if any childs unselected', () => {
  onUnSelect(sample[0][childField][0]);
  expect(sample[0].selected).toEqual(false);
});

it('Select Category item', () => {
  onClear(sample);
  sample[0].isParent = true;
  onSelect(sample[0]);
  expect(sample[0].selected).toEqual(true);
  const selectItem = getSelected(sample);
  expect(selectItem[0].name).toEqual(sample[0].name);
  const names = getNames(selectItem);
  // console.log(keys(names));
  expect(keys(names)[0]).toEqual(sample[0].name);
});

it('Select BRAND item', () => {
  onClear(sample);
  onSelect(sample[0][childField][0]);
  expect(sample[0][childField][0].selected).toEqual(true);
  const selectItem = getSelected(sample);
  expect(selectItem[0].name).toEqual(sample[0][childField][0].name);
});

it('Select MODEL item', () => {
  onClear(sample);
  onSelect(sample[0][childField][0][childField][0]);
  expect(sample[0][childField][0][childField][0].selected).toEqual(true);
  const selectItem = getSelected(sample);
  expect(selectItem[0].name).toEqual(sample[0][childField][0][childField][0].name);
});

it('Select two Vars item', () => {
  onClear(sample);
  sample[0][childField][0][childField][0][childField][2].parent = sample[0][childField][0][childField][0];
  sample[0][childField][0][childField][0][childField][1].parent = sample[0][childField][0][childField][0];
  sample[0][childField][0][childField][0][childField][0].parent = sample[0][childField][0][childField][0];
  sample[0][childField][0][childField][0][childField][2].parentName = sample[0][childField][0][childField][0].name;
  sample[0][childField][0][childField][0][childField][1].parentName = sample[0][childField][0][childField][0].name;
  sample[0][childField][0][childField][0][childField][0].parentName = sample[0][childField][0][childField][0].name;

  onSelect(sample[0][childField][0][childField][0][childField][0]);
  expect(sample[0][childField][0][childField][0][childField][0].selected).toEqual(true);
  onSelect(sample[0][childField][0][childField][0][childField][1]);
  expect(sample[0][childField][0][childField][0][childField][1].selected).toEqual(true);
  const selectItem = getSelected(sample);
  expect(selectItem[0].name).toEqual(sample[0][childField][0][childField][0][childField][0].name);
  expect(selectItem[1].name).toEqual(sample[0][childField][0][childField][0][childField][1].name);
});

it('Select two Vars item name', () => {
  const selectItem = getSelected(sample);
  const names = getNames(selectItem);
  const childNames = getChildsNames(names['Galaxy S10+'].data);
  expect(childNames).toEqual('10GB, 16GB');
});
