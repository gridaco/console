import React from 'react';
import { styled } from '@linaria/react';

import DashboardLayout from '../../layouts/dashboard';
import SearchFormBox from '../../components/search/search-form-box';
import { IIconGridItem } from '../../components/icon-item/icon-grid-item';

import IconSection from '../../components/icons/icon-section';

import HomeDemoSVG from '../../public/assets/icons/demo/home.svg';
import HeartDemoSVG from '../../public/assets/icons/demo/heart.svg';
import SettingDemoSVG from '../../public/assets/icons/demo/setting.svg';


const exampleIcons: IIconGridItem[] = [
  {
    icon: <HomeDemoSVG />,
    name: 'B_T_Home',
  },
  {
    icon: <HeartDemoSVG />,
    name: 'B_T_Heart',
  },
  {
    icon: <SettingDemoSVG />,
    name: 'B_T_Setting',
  }
]

export default function AssetsPage() {
  return (
    <DashboardLayout title="Overview">
      <Toolbar>
        {/* <SearchFormBox containerStyle={{ width: 200 }} /> */}
      </Toolbar>
      <IconSection title="Bottom Tab Bar Icons" icons={exampleIcons} />
      {/* <IconSection title="Material Icons (default)" icons={exampleIcons} /> */}
      {/* <IconSection title="Reflect Icons (default)" icons={exampleIcons} /> */}
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
