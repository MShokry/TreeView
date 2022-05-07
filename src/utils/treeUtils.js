export const refrehParent = (item, childField = 'childs') => {
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

export const onSelect = (item, childField = 'childs') => {
  item.selected = true;
  item?.[childField] && item[childField].map(child => onSelect(child));
  item?.parent && refrehParent(item.parent);
};

export const onUnSelect = (item, childField = 'childs') => {
  item.selected = false;
  item?.[childField] && item[childField].map(child => onUnSelect(child));
  item?.parent && refrehParent(item.parent);
};

export const onClear = (items, childField = 'childs') => {
  items.map(item => {
    item.selected = false;
    if (item[childField]) {
      onClear(item[childField]);
    }
  });
};

export const getChildsNames = (item, textField = 'name') => {
  return (item?.map(e => e[textField]) || []).join(', ');
};

export const getNames = (selected, textField = 'name') => {
  const categories =
    selected.reduce((acc, item) => {
      if (item.isParent) {
        acc[item[textField]] ??= {...item};
      } else {
        (acc[item.parentName] ??= {isParent: false, data: []}).data.push({...item});
      }
      return acc;
    }, {}) || [];

  return categories;
};
