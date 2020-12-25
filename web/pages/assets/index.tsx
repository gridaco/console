import React from 'react';
import { useQueryParam, StringParam, withDefault } from 'use-query-params';
import { styled } from '@linaria/react';

import DashboardLayout from '../../layouts/dashboard';
import Button from '../../components/button';
import SearchBox from '../../components/search/search-box';
import { AssetListItem } from '../../components/asset-item';

const tabs = [
  { name: 'ALL', value: 'all' },
  { name: 'Illustrations', value: 'illustrations' },
  { name: 'Images', value: 'images' },
  { name: 'Text', value: 'text' },
];

export default function ScreensPage() {
  const [currentTab, setCurrentTab] = useQueryParam(
    'tab',
    withDefault(StringParam, 'all')
  );

  return (
    <DashboardLayout title="Overview">
      <Toolbar>
        <SearchBox inputStyle={{ width: 264 }} />
        <Button>UPLOAD NEW</Button>
      </Toolbar>
      <TabBar>
        <TabList>
          {tabs.map(({ name, value }) => (
            <TabItem
              key={value}
              isSelected={value === currentTab}
              onClick={() => setCurrentTab(value)}
            >
              {name}
            </TabItem>
          ))}
        </TabList>
      </TabBar>
      <Grid>
        <AssetListItem
          title="Asset Name"
          preview="/assets/examples/project.png"
        />
      </Grid>
    </DashboardLayout>
  );
}

const Toolbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  & > button {
    padding: 0 24px;
    font-size: 16px;
  }
`;

const TabBar = styled.div``;

const TabList = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
`;

interface ITabItem {
  isSelected: boolean;
}

const TabItem = styled.li<ITabItem>`
  font-size: 16px;
  line-height: 1.2;
  color: ${({ isSelected }) => (isSelected ? 'black' : '#9a9a9a')};
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 24px;
  }
`;

const Grid = styled.div``;
