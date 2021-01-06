import React from 'react';
import { styled } from '@linaria/react';

export interface IIconGridItem {
  icon: React.ReactNode;
  name: string;
}

const IconGridItem: React.FC<IIconGridItem> = ({ icon, name }) => {
  return (
    <Container>
      <IconWrapper>{icon}</IconWrapper>
      <Name>{name}</Name>
    </Container>
  );
};

export default IconGridItem;

const Container = styled.li`
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  background: #fafafa;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.h3`
  font-weight: normal;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #000000;
  margin-top: 8px;
`;
