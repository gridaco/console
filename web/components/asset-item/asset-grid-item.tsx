import React from 'react';
import { styled } from '@linaria/react';

import { IAssetItem } from './types';

const AssetGridItem: React.FC<IAssetItem> = ({ preview, title, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Image src={preview} />
      <Information>
        <Title>{title}</Title>
      </Information>
    </Container>
  );
};

export default AssetGridItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  min-height: 156px;
  object-fit: cover;
  margin-bottom: auto;
`;

const Information = styled.div`
  flex: 1;
  padding-top: 13px;
  padding-bottom: 24px;
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.2;
  color: #000000;
`;
