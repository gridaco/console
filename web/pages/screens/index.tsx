import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@linaria/react';
import axios from 'axios';

import DashboardLayout from '../../layouts/dashboard';
import { SceneItem } from '../../components/scene-item';
import SearchBox from '../../components/search/search-box';

interface IScreen {
  name: string;
  source: string;
  preview: string;
  updatedAt: string;
}

const DEFAULT_JSON_API =
  'https://gist.githubusercontent.com/junhoyeo/743e50c861bfa308ea5ccecae00b1c01/raw/afa9151a830eeaab4e6632b785eb642876c8e096/screens.json';

export default function ScreensPage() {
  const router = useRouter();
  const query = {
    src: (router.query.src as string) || DEFAULT_JSON_API,
    screenRedirect: (router.query.screenRedirect as string) || '',
  };

  const [focusedScreenId, setFocusedScreenId] = useState<string>();
  const [screens, setScreens] = useState<IScreen[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { onclick, ...data },
      } = await axios.get(query.src);
      console.log(data);
      setScreens([
        {
          ...data,
          source: query.screenRedirect || onclick,
        },
      ]);
    };

    fetchData();
  }, []);

  const handleSelection = (id: string) => {
    setFocusedScreenId(id);
  };

  // const handleDoubleClick = (id: string) => {
  //   router.push(`/globalization/?scene=${id}`);
  // };

  const handleDoubleClick = (source: string) => {
    window.location.href = source;
  };

  return (
    <DashboardLayout title="Overview">
      <SearchBox
        style={{
          marginBottom: 24,
        }}
      />
      <Grid>
        {screens.map(({ source, ...d }, i) => {
          const id = i.toString();
          return (
            <SceneItem
              key={id}
              id={id}
              onSelected={handleSelection}
              onDoubleClick={() => handleDoubleClick(source)}
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
