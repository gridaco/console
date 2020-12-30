import React from 'react';
import { styled } from '@linaria/react';

interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<ISelect> = ({ children, ...props }) => {
  return (
    <SelectContainer>
      <LargeSelect {...props}>{children}</LargeSelect>
      <SelectIconWrapper>
        <SelectIconImage src="/assets/icons/mdi_keyboard_arrow_down.svg" />
      </SelectIconWrapper>
    </SelectContainer>
  );
};

export default Select;

const SelectContainer = styled.div`
  background: #151617;
  border-radius: 6px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const LargeSelect = styled.select`
  appearance: none;
  background: transparent;
  color: white;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.3px;
  border: 0;
  padding: 8px 12px;
  padding-right: 44px;
  min-height: 40px;
`;

const SelectIconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12px;
  padding: 8px 0;
`;

const SelectIconImage = styled.img`
  width: 24px;
  height: 24px;
`;
