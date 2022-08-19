import React from 'react';
import ListItem, { ListItemProps } from '@mui/material/ListItem';

export function LinkNavigationMenuItem(
  props: ListItemProps<'a', { button?: true }>
) {
  return <ListItem button component="a" {...props} />;
}
