/**
 * @format
 */

import React from 'react';
import 'react-native';

import '@testing-library/jest-native/extend-expect';
import {toBeEmpty, toHaveTextContent} from '@testing-library/jest-native';

import {render} from '@testing-library/react-native';
import {sample} from 'utils/sample';
import Filter from 'containers/Filter';
import {onSelect} from 'utils/treeUtils';

const textField = 'name';
const childField = 'childs';

it('renders the correct element', () => {
  onSelect(sample[1][childField][1][childField][1]);
  sample[0].isParent = true;
  onSelect(sample[0]);
  const {queryByText} = render(<Filter products={sample} />);
  expect(queryByText(sample[0].name)).not.toBeNull();
});
