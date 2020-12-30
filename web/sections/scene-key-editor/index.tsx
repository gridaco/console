import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@linaria/react';
import {
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
} from '@material-ui/core';
import { DesignGlobalizationRepository } from '@bridged.xyz/client-sdk/lib/g11n/repository';
import { LayerTranslation } from '@bridged.xyz/client-sdk/lib/g11n';

import Toolbar from '../../components/toolbar';
import EditableTextCard from '../../components/g11n/editable-text-card';
import { currentEditorialLocaleAtom } from '../../states/editor-state';
import { SceneRepositoryStore } from '../../repositories';

const SceneKeyEditor = (props: {
  repository: DesignGlobalizationRepository;
}) => {
  const { repository } = props;

  const [translations, setTranslations] = useState<
    ReadonlyArray<LayerTranslation>
  >([]);
  const [locale, setLocale] = useRecoilState(currentEditorialLocaleAtom);
  const handleLocaleSelectChange = (e: any) => {
    setLocale(e.target.value as string);
  };

  let sceneName = 'loading...';
  if (repository) {
    sceneName =
      SceneRepositoryStore.find(repository.sceneId).scene.name ??
      'no-named scene';
  }

  useEffect(() => {
    let mounted = true;
    console.log('fetching translations under scene', props.repository.sceneId);
    repository
      .fetchTranslations()
      .then((d) => {
        console.log(
          'fetched translations under scene',
          props.repository.sceneId,
          d
        );
        setTranslations(d);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <Toolbar />
      <KeyContainer>
        <Box m={2}>
          <FormControl>
            <Select value={locale} onChange={handleLocaleSelectChange}>
              <MenuItem value="ko">Ko</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ja">JP</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div>
          {translations.map((t) => {
            return <EditableTextCard translation={t.translation} />;
          })}
        </div>
      </KeyContainer>
    </>
  );
};

export default SceneKeyEditor;

const KeyContainer = styled.div`
  padding: 24px 32px;
  overflow-y: scroll;
  width: 100%;
`;
