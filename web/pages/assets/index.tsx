import React from "react";
import { styled } from "@linaria/react";

import DashboardLayout from "../../layouts/dashboard";
import Button from "../../components/button";
import SearchBox from "../../components/search/search-box";

export default function ScreensPage() {
  return (
    <DashboardLayout title="Overview">
      <Toolbar>
        <SearchBox />
        <Button>UPLOAD NEW</Button>
      </Toolbar>
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
