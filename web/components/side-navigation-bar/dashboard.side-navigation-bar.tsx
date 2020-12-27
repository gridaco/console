import React from 'react';
import { styled } from '@linaria/react';

import ListItem, { INavigation } from './dashboard.side-item';
import { useRouter } from 'next/router';

const navigations: INavigation[] = [
  {
    name: 'Overview',
    // path: '/overview',
    icon: '/assets/icons/mdi_remove_red_eye.svg',
  },
  {
    name: 'Screens',
    path: '/screens',
    icon: '/assets/icons/mdi_remove_red_eye.svg',
  },
  {
    name: 'Fonts',
    // path: '/fonts',
    icon: '',
  },
  {
    name: 'Icons',
    // path: '/icons',
    icon: '',
  },
  {
    name: 'Assets',
    path: '/assets',
    icon: '/assets/icons/mdi_web_asset.svg',
  },
  {
    name: 'Code',
    // path: '/code',
    icon: '/assets/icons/icons.svg',
  },
];

export function DashboardSideNavigationBar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ListContainer>
      {navigations.map(({ path, ...navigation }, navigationIndex) => (
        <ListItem
          key={navigationIndex}
          path={path}
          router={router}
          isSelected={path === pathname}
          {...navigation}
        />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.nav`
  height: 100%;
  background-color: white;
  width: 200px;
  border-right: 1px solid #efefef;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-top: 80px;
`;
