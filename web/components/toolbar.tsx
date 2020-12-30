import React from 'react';
import { styled } from '@linaria/react';

interface IToolbar {
  toQuicklook?: string;
  toGlobalization?: string;
}

const Toolbar: React.FC<IToolbar> = ({
  toQuicklook,
  toGlobalization,
  children,
}) => {
  return (
    <Wrapper>
      <TabList>
        <a href={toQuicklook}>
          <TabButton style={{ color: '#000000', marginRight: 8 }}>
            <TabIconImage src="/assets/icons/mdi_code_round.svg" />
            Code Editor
          </TabButton>
        </a>
        <a href={toGlobalization}>
          <TabButton>
            <TabIconImage src="/assets/icons/mdi_language_round.svg" />
            Language translation
          </TabButton>
        </a>
      </TabList>
      {children}
    </Wrapper>
  );
};

export default Toolbar;

const Wrapper = styled.div`
  padding: 10px 12px;
  background: #ffffff;
  box-shadow: inset 0px -1px 0px #e3e3e3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TabList = styled.div`
  display: flex;
  align-items: center;
`;

const TabButton = styled.button`
  border: 0;
  background-color: transparent;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  color: #dadadc;
  border-radius: 4px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active,
  &:focus {
    outline: 0;
  }
`;

const TabIconImage = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
`;
