import React from 'react';
import { styled } from '@linaria/react';

const SelectedAssetInformation: React.FC = () => {
  return (
    <Container>
      <Title>Lint Cover Illust</Title>
      <FilePath>illusts/lint/eye-cover-main</FilePath>
      <PreviewImage src={'/assets/examples/project.png'} />
      <UpdatedAt>last updated 2 hours ago by @gy</UpdatedAt>
    </Container>
  );
};

export default SelectedAssetInformation;

const Container = styled.div`
  background: #f9f9f9;
  border: 1px solid #eeeeee;
  width: 384px;
  padding: 24px 26px;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.h6`
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
`;

const FilePath = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.2;
  color: #636363;
`;

const PreviewImage = styled.img`
  object-fit: cover;
  height: 332px;
  width: 332px;
  margin-top: 13px;
`;

const UpdatedAt = styled.p`
  margin: 0;
  margin-top: 12px;
  font-size: 16px;
  line-height: 1.2;
  color: #636363;
`;
