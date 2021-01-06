import React from 'react';
import { styled } from '@linaria/react';

import DashboardLayout from '../../layouts/dashboard';
import SearchFormBox from '../../components/search/search-form-box';
import IconGridItem, {
  IIconGridItem,
} from '../../components/icon-item/icon-grid-item';

import ExampleSVG from '../../assets/icons/mdi_language_round.svg';

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
      <SectionTitle>Icon List</SectionTitle>
      <Grid>
        {exampleIcons.map(({ icon, name }) => (
          <IconGridItem icon={null} name="Icon Name" />
        ))}
      </Grid>
      <SectionTitle>Material Icons (default)</SectionTitle>
      <SectionTitle>Reflect Icons (default)</SectionTitle>
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

const SectionTitle = styled.h1`
  font-weight: 900;
  font-size: 28px;
  line-height: 1.17;
  color: #000000;
  margin-bottom: 24px;
`;

const Grid = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1.5rem;
`;
