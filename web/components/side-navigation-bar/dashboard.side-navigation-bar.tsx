import React from 'react';
import { useRouter } from 'next/router';
import { styled } from '@linaria/react';

import ListItem from './dashboard.side-item';
import { navigations } from './dashboard.constants';

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
