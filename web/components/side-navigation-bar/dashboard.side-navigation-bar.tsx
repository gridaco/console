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
      <NavigationList>
        {navigations.map(({ path, ...navigation }, navigationIndex) => (
          <ListItem
            key={navigationIndex}
            path={path}
            router={router}
            isSelected={path === pathname}
            {...navigation}
          />
        ))}
      </NavigationList>
      <ButtonWrapper>
        <Button>
          <IconImage src="/assets/icons/mdi_settings.svg" />
          <span>Project Settings</span>
        </Button>
      </ButtonWrapper>
    </ListContainer>
  );
}

const ListContainer = styled.nav`
  height: 100%;
  background-color: white;
  width: 200px;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
`;

const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid #efefef;
`;

const ButtonWrapper = styled.div`
  padding: 24px;
  padding-top: 50px;
  width: 100%;
  display: flex;
  margin-top: auto;
`;

const Button = styled.button`
  width: 100%;
  background-color: #eaeaea;
  border: 0;
  border-radius: 8px;
  padding: 11px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    font-weight: bold;
    font-size: 14px;
    line-height: 1.2;
    color: #222222;
  }
`;

const IconImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;
