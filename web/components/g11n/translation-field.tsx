import React from 'react';
import { useRecoilState } from 'recoil';
import { styled } from '@linaria/react';

import TextInput from './text-input';
import { currentTextEditValueAtom } from '../../states';

/**
 * single field with translation compatability
 */
interface ITranslationFieldRow {
  key: string;
  locale: string;
  initialValue?: string;
  onSubmit: (locale: string, value: string) => void;
  isAutoTranslate?: boolean;
}

export const TranslationFieldRow: React.FC<ITranslationFieldRow> = ({
  isAutoTranslate,
  ...props
}) => {
  return (
    <Wrapper>
      <LocaleText>
        <span>{props.locale}</span>
      </LocaleText>
      <TranslationEditField isAutoTranslate={isAutoTranslate} {...props} />
      {isAutoTranslate && (
        <Button>
          <span>Accept</span>
        </Button>
      )}
    </Wrapper>
  );
};

export const TranslationEditField = ({
  isAutoTranslate,
  ...props
}: ITranslationFieldRow) => {
  const [currentEditTextValue, setCurrentEditTextValue] = useRecoilState(
    currentTextEditValueAtom
  );

  const handleEdit = (e: any) => {
    setCurrentEditTextValue(e.target.value);
  };

  // on key down, when enter key is pressed via keyboard or save button clicked.
  const handleOnSubmit = (e: any) => {
    console.log('saving translation - ', currentEditTextValue);
    props.onSubmit(props.locale, currentEditTextValue);
  };

  return (
    <StyledTextInput
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          handleOnSubmit(event);
          event.preventDefault();
        }
      }}
      defaultValue={props.initialValue}
      onChange={handleEdit}
      data-auto-translate={isAutoTranslate && 'true'}
    />
  );
};

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

const StyledTextInput = styled(TextInput)`
  margin-left: 12px;

  &[data-auto-translate='true'] {
    margin-right: 16px;
  }
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
