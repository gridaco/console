import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from '@linaria/react';

import { currentTextEditValueAtom } from '../../states';

/**
 * single field with translation compatability
 */
export function TranslationFieldRow(props: {
  key: string;
  locale: string;
  initialValue?: string;
  onSubmit: (locale: string, value: string) => void;
}) {
  const onSubmit = (value: string) => {
    props.onSubmit(props.locale, value);
  };

  return (
    <Wrapper>
      <LocaleText>
        <span>{props.locale}</span>
      </LocaleText>
      <TranslationEditField {...props} onSubmit={onSubmit} />
      {/* TODO: onClick for Button */}
      <Button>
        <span>Accept</span>
      </Button>
    </Wrapper>
  );
}

export function TranslationEditField(props: {
  key: string;
  locale: string;
  initialValue?: string;
  onSubmit: (s: string) => void;
}) {
  const [currentEditTextValue, setCurrentEditTextValue] = useRecoilState(
    currentTextEditValueAtom
  );

  const handleEdit = (e: any) => {
    setCurrentEditTextValue(e.target.value);
  };

  // on key down, when enter key is pressed via keyboard or save button clicked.
  const handleOnSubmit = (e: any) => {
    console.log('saving translation - ', currentEditTextValue);
    props.onSubmit(currentEditTextValue);
  };

  return (
    <TextField
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          handleOnSubmit(ev);
          ev.preventDefault();
        }
      }}
      defaultValue={props.initialValue}
      onChange={handleEdit}
    />
  );
}

const Wrapper = styled.li`
  display: flex;

  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

const LocaleText = styled.div`
  background: #f9f9f9;
  border-radius: 4px;
  padding: 9px 12px;
  width: 160px;

  span {
    font-size: 13px;
    line-height: 1.2;
    color: #94959a;
  }
`;

const TextField = styled.input`
  background: #edf2ff;
  border: 1px solid #2562ff;
  border-radius: 4px;
  padding: 9px 12px;
  font-size: 13px;
  line-height: 1.2;
  color: #151617;
  flex: 1;
  margin-left: 12px;
  margin-right: 16px;
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;

  span {
    font-weight: bold;
    font-size: 13px;
    line-height: 1.2;
    color: #2562ff;
  }
`;
