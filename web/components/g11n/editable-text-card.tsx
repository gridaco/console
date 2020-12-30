import React, { useState, useMemo } from 'react';
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

const availableLocales = ['ko', 'en', 'ja'];

interface IEditableTextCard {
  translation: IGlobalizedKey;
}

const EditableTextCard: React.FC<IEditableTextCard> = ({ translation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const translations = useMemo(() => Object.keys(translation.translations), [
    translation.translations,
  ]);

  const [editorialLoclae] = useRecoilState(currentEditorialLocaleAtom);
  const defaultLocaleTranslationValue =
    (translation.translations as any)[editorialLoclae]?.value ??
    'no translation';

  const handleOnTranslationValueChange = (locale: string, value: string) => {
    console.log('handleOnTranslationValueChange', locale, value);
  };

  const [translationLength, availableLocaleLength, isComplete] = useMemo(() => {
    const translationLength = translations.length;
    const availableLocaleLength = availableLocales.length;
    return [
      translationLength,
      availableLocaleLength,
      translationLength === availableLocaleLength,
    ];
  }, []);

  return (
    <Container>
      <Summary onClick={() => setIsOpen(!isOpen)}>
        <KeyInformation>
          <KeyName>{translation.key}</KeyName>
          <KeyTranslation>{defaultLocaleTranslationValue}</KeyTranslation>
        </KeyInformation>
        <BadgeRow>
          <Badge data-success={isComplete && 'true'}>
            {`${translationLength}/${availableLocaleLength}`}
          </Badge>
          <DropdownIcon
            src="/assets/icons/mdi_arrow_drop_down_round.svg"
            style={{
              transform: isOpen ? 'rotate(180deg)' : undefined,
            }}
          />
        </BadgeRow>
      </Summary>
      {isOpen && (
        <KeyList>
          {translations.map((key) => {
            const keyId = translation.id;
            const localekey = key;
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

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: auto;
`;

const Badge = styled.span`
  background-color: #fcd6d6;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px;
  color: #ff5353;

  &[data-success='true'] {
    background-color: #ddffde;
    color: #62d066;
  }
`;

const DropdownIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-left: 4px;
  user-select: none;
  -webkit-user-drag: none;
`;

const KeyList = styled.ul`
  margin: 0;
  padding: 24px;
  padding-right: 15px;
  border-top: 1px solid #cfcfcf;
  list-style-type: none;
`;
