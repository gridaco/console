import React from 'react';
import { styled } from '@linaria/react';

import { IAssetItem } from './types';

const AssetListItem: React.FC<IAssetItem> = ({ preview, title }) => {
  return (
    <Container>
      <Image src={preview} />
      <Information>
        <Title>{title}</Title>
      </Information>
    </Container>
  );
};

export default AssetListItem;

const Container = styled.div`
  display: flex;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  cursor: pointer;
`;

const Image = styled.img`
  width: 78px;
  height: 78px;
  object-fit: cover;
`;

const Information = styled.div`
  flex: 1;
  padding: 0 33px;
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
  color: #000000;
`;
