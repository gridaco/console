import React from 'react';
import { styled } from 'linaria/react';

const Select: React.FC = ({ children }: React.PropsWithChildren) => {
  return (
    <SelectContainer>
      <LargeSelect>{children}</LargeSelect>
      <SelectIconWrapper>
        <SelectIconImage src="/assets/icons/mdi_keyboard_arrow_down.svg" />
      </SelectIconWrapper>
    </SelectContainer>
  );
};

export default Select;

const SelectContainer = styled.div`
  background: #3491ff;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 6px;
  cursor: pointer;
`;

const LargeSelect = styled.select`
  appearance: none;
  background: transparent;
  color: white;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.3px;
  border: 0;
  padding: 4px 9px;
  padding-right: 36px;
  min-height: 31px;
`;

const SelectIconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 8px;
  padding: 4px 0;
`;

const SelectIconImage = styled.img`
  width: 24px;
  height: 24px;
`;
