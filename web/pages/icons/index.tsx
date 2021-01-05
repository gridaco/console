import React from 'react';
import { styled } from '@linaria/react';

import DashboardLayout from '../../layouts/dashboard';
import SearchFormBox from '../../components/search/search-form-box';

export default function AssetsPage() {
  return (
    <DashboardLayout title="Overview">
      <Toolbar>
        <SearchFormBox containerStyle={{ width: 200 }} />
      </Toolbar>
      <SectionTitle>Icon List</SectionTitle>
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
`;
