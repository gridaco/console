import React, { useRef } from 'react';
import { styled } from '@linaria/react';

import IconButton from '../icon-button';

interface ISearchInputBox {
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  placeholder?: string;
}

export default function SearchInputBox({
  style,
  inputStyle,
  placeholder = 'Search your stuff',
}: ISearchInputBox) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickInputWrapper = () => inputRef?.current?.focus();

  return (
    <InputWrapper style={inputStyle} onClick={onClickInputWrapper}>
      <IconButton aria-label="search">
        <IconImage src="/assets/icons/mdi_search.svg" />
      </IconButton>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  background: #fafafa;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 8px;
  width: 427px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  border: 0;
  background-color: transparent;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.14;
  display: flex;
  align-items: center;
  flex: 1;

  &::placeholder {
    color: #cbcbcb;
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;
