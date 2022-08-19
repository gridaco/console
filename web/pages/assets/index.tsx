import React, { useState, useMemo } from "react";
import { useQueryParam, StringParam, withDefault } from "next-query-params";
import { styled } from "linaria/react";

import DashboardLayout from "../../layouts/dashboard";
import Button from "../../components/button";
import SearchFormBox from "../../components/search/search-form-box";
import { AssetListItem, AssetGridItem } from "../../components/asset-item";
import IconButton from "../../components/icon-button";
import SelectedAssetInformation from "../../components/assets/selected-asset-information";

const tabs = [
  { name: "ALL", value: "all" },
  { name: "Illustrations", value: "illustrations" },
  { name: "Images", value: "images" },
  { name: "Text", value: "text" },
];

interface IAsset {
  id: string;
  title: string;
  preview: string;
}

const exampleAssets: IAsset[] = Array(7).fill({
  title: "Asset Name",
  preview: "/assets/examples/project.png",
});

export default function AssetsPage() {
  const [currentView, setCurrentView] = useQueryParam(
    "view",
    withDefault(StringParam, "grid")
  );
  const [currentTab, setCurrentTab] = useQueryParam(
    "tab",
    withDefault(StringParam, "all")
  );
  const [selectedAsset, setSelectedAsset] = useState<IAsset>();

  const isGridView = useMemo(() => currentView === "grid", [currentView]);

  const onClickAsset = (asset: IAsset) => {
    if (asset.id === selectedAsset?.id) {
      setSelectedAsset(undefined);
      return;
    }
    setSelectedAsset(asset);
  };

  return (
    <DashboardLayout
      title="Overview"
      rightChildren={selectedAsset && <SelectedAssetInformation />}
    >
      <Toolbar>
        <SearchFormBox containerStyle={{ width: 264 }} />
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
        <IconList>
          <IconButton
            onClick={() => setCurrentView("list")}
            style={{ marginRight: 9 }}
          >
            <IconImage
              src={`/assets/icons/${isGridView ? "list" : "list_view"}.svg`}
            />
          </IconButton>
          <IconButton onClick={() => setCurrentView("grid")}>
            <IconImage
              src={`/assets/icons/${isGridView ? "grid_view" : "grid"}.svg`}
            />
          </IconButton>
        </IconList>
      </TabBar>
      {isGridView ? (
        <Grid>
          {exampleAssets.map((asset, assetIndex) => {
            const { title, preview } = asset;
            return (
              <AssetGridItem
                key={assetIndex}
                title={title}
                preview={preview}
                onClick={() =>
                  onClickAsset({
                    ...asset,
                    id: assetIndex.toString(),
                  })
                }
              />
            );
          })}
        </Grid>
      ) : (
        <List>
          {exampleAssets.map((asset, assetIndex) => {
            const { title, preview } = asset;
            return (
              <AssetListItem
                key={assetIndex}
                title={title}
                preview={preview}
                onClick={() =>
                  onClickAsset({
                    ...asset,
                    id: assetIndex.toString(),
                  })
                }
              />
            );
          })}
        </List>
      )}
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

const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TabList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 0;
`;

interface ITabItem {
  isSelected: boolean;
}

const TabItem = styled.li<ITabItem>`
  font-size: 16px;
  line-height: 1.2;
  color: ${({ isSelected }) => (isSelected ? "black" : "#9a9a9a")};
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 24px;
  }
`;

const IconList = styled.div`
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  width: 28px;
  height: 28px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
  grid-gap: 1.5rem;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  & > div {
    width: calc(50% - 8px);
    margin-bottom: 16px;

    &:nth-child(2n + 1) {
      margin-right: auto;
    }
  }
`;
