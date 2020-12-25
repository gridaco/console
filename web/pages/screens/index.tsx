import React, { useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@linaria/react";

import DashboardLayout from "../../layouts/dashboard";
import { SceneItem } from "../../components/scene-item";
import SearchBox from "../../components/search/search-box";

export default function ScreensPage() {
  const router = useRouter();
  const [focusedScreenId, setFocusedScreenId] = useState<string>();
  const data = {
    name: "screen1",
    description: "my first scene",
    lastEdit: "2 days ago",
    preview: "/assets/examples/scene.png",
  };

  const datas = Array(12).fill(data);

  const handleSelection = (id: string) => {
    setFocusedScreenId(id);
  };

  const handleDoubleClick = (id: string) => {
    router.push(`/globalization/?scene=${id}`);
  };

  return (
    <DashboardLayout title="Overview">
      <SearchBox
        style={{
          marginBottom: 24,
        }}
      />
      <Grid>
        {datas.map((d, i) => {
          const id = i.toString();
          return (
            <SceneItem
              key={id}
              id={id}
              onSelected={handleSelection}
              onDoubleClick={handleDoubleClick}
              isSelected={focusedScreenId === id}
              data={d}
            />
          );
        })}
      </Grid>
    </DashboardLayout>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
  grid-gap: 1.5rem;
`;
