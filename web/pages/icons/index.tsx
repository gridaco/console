import React from 'react';
import { styled } from '@linaria/react';

import DashboardLayout from '../../layouts/dashboard';
import SearchFormBox from '../../components/search/search-form-box';
import { IIconGridItem } from '../../components/icon-item/icon-grid-item';

import ExampleSVG from '../../assets/icons/mdi_brunch_dining.svg';
import IconSection from '../../components/icons/icon-section';

const exampleIcons: IIconGridItem[] = Array(15).fill({
  icon: <ExampleSVG />,
  name: 'Icon Name',
});

export default function AssetsPage() {
  return (
    <DashboardLayout title="Overview">
      <Toolbar>
        <SearchFormBox containerStyle={{ width: 200 }} />
      </Toolbar>
      <IconSection title="Icon List" icons={exampleIcons} />
      <IconSection title="Material Icons (default)" icons={exampleIcons} />
      <IconSection title="Reflect Icons (default)" icons={exampleIcons} />
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
