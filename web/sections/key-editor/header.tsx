import React from 'react';
import { styled } from '@linaria/react';
import IconButton from '../../components/icon-button';

interface IHeader {
  title: string;
  onClickBack?: () => void;
}

const Header: React.FC<IHeader> = ({ title, onClickBack, children }) => {
  return (
    <Container>
      <LeftSide>
        <BackButton onClick={onClickBack}>
          <BackIcon src="/assets/icons/mdi_arrow_back.svg" />
        </BackButton>
        <Title>{title}</Title>
      </LeftSide>
      {children}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  border-bottom: 1px solid #e3e3e3;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled(IconButton)`
  width: 36px;
  height: 36px;
  background: #ededed;
  border-radius: 8px;
  margin: 2px 0;
  margin-right: 16px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
  color: #151617;
`;
