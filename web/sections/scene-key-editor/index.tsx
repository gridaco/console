import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@linaria/react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
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
      <Header>
        <TitleWrapper>
          <Title>Key List</Title>
          <KeyLengthBadge>
            <span>{translations.length}</span>
          </KeyLengthBadge>
        </TitleWrapper>
        <ButtonList>
          <OutlineButton style={{ marginRight: 12 }}>
            <span>Select</span>
          </OutlineButton>
          <Button>
            <IconImage src="/assets/icons/mdi_vpn_key_round.svg" />
            <span>Add Key</span>
          </Button>
        </ButtonList>
      </Header>
      <KeyContainer>
        <FormControl>
          <Select value={locale} onChange={handleLocaleSelectChange}>
            <MenuItem value="ko">Ko</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ja">JP</MenuItem>
          </Select>
        </FormControl>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
  padding: 18px 32px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
  color: #000000;
  width: fit-content;
  margin-right: 10px;
`;

const ButtonList = styled.div`
  display: flex;
  align-items: center;
`;

const OutlineButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border: 1px solid #151617;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: transparent;
  height: 40px;
  cursor: pointer;

  & > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: #151617;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: #151617;
  border-radius: 6px;
  border: 0;
  height: 40px;
  cursor: pointer;

  & > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    color: #ffffff;
  }
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  user-select: none;
  -webkit-user-drag: none;
`;

const KeyLengthBadge = styled.div`
  width: 32px;
  height: 32px;
  background: #f5f3f3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-weight: bold;
    font-size: 16px;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: #9b9b9b;
  }
`;

const KeyContainer = styled.div`
  padding: 24px 32px;
  overflow-y: scroll;
  width: 100%;
`;
