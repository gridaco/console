import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@linaria/react';

import {
  GlobalizedKey,
  IGlobalizedKey,
} from '@bridged.xyz/client-sdk/lib/g11n';
import { RawAsset } from '@bridged.xyz/client-sdk/lib/assets';
import { Grid, Box, Typography } from '@material-ui/core';

import { currentEditorialLocaleAtom } from '../../states/editor-state';
import { TranslationFieldRow } from './translation-field';

interface IEditableTextCard {
  translation: IGlobalizedKey;
}

const EditableTextCard: React.FC<IEditableTextCard> = ({ translation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [editorialLoclae] = useRecoilState(currentEditorialLocaleAtom);
  const defaultLocaleTranslationValue =
    (translation.translations as any)[editorialLoclae]?.value ??
    'no translation';

  const handleOnTranslationValueChange = (locale: string, value: string) => {
    console.log('handleOnTranslationValueChange', locale, value);
  };

  return (
    <Container>
      <Summary onClick={() => setIsOpen(!isOpen)}>
        <KeyInformation>
          <KeyName>{translation.key}</KeyName>
          <KeyTranslation>{defaultLocaleTranslationValue}</KeyTranslation>
        </KeyInformation>
        <Box
          p={1}
          color={'#62D066'}
          style={{
            borderRadius: 4,
            backgroundColor: '#DDFFDE',
          }}
        >
          <Typography align="center">3/3</Typography>
        </Box>
      </Summary>
      {isOpen && (
        <KeyList>
          {Object.keys(translation.translations).map((k) => {
            const keyId = translation.id;
            const localekey = k;
            const localeTranslationAsset = (translation.translations as any)[
              localekey
            ] as RawAsset;
            const localeTranslationValue = localeTranslationAsset.value;
            return (
              <TranslationFieldRow
                key={keyId}
                locale={localekey}
                initialValue={localeTranslationValue}
                onSubmit={handleOnTranslationValueChange}
              />
            );
          })}
        </KeyList>
      )}
    </Container>
  );
};

export default EditableTextCard;

const Container = styled.div`
  border: 1px solid #cfcfcf;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Summary = styled.div`
  padding: 16px 24px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const KeyInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const KeyName = styled.h2`
  margin: 0;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.2;
  color: #151617;
`;

const KeyTranslation = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.2;
  color: #717278;
`;

const KeyList = styled.ul`
  margin: 0;
  padding: 24px;
  padding-right: 15px;
  border-top: 1px solid #cfcfcf;
  list-style-type: none;
`;
