import React from 'react';
import { styled } from 'linaria/react';

import Select from './select';
import InformationSection from './information.section';
import IconButton from '../icon-button';

const exampleManagers = Array(4).fill({
  profile: '/assets/examples/profile.png',
});

const SelectedAssetInformation: React.FC = () => {
  return (
    <Container>
      <Title>Lint Cover Illust</Title>
      <FilePath>illusts/lint/eye-cover-main</FilePath>
      <SelectWrapper>
        {/* @ts-ignore */}
        <Select>
          <option selected>English(Default)</option>
          <option>한국어</option>
        </Select>
      </SelectWrapper>
      <PreviewImage src={'/assets/examples/project.png'} />
      <UpdatedAt>last updated 2 hours ago by @gy</UpdatedAt>
      <SectionList>
        <InformationSection
          title="Manager"
          icon={
            <IconButton>
              <IconImage src="/assets/icons/mdi_add_circle_outline_round.svg" />
            </IconButton>
          }
        >
          <ManagerList>
            {exampleManagers.map(({ profile }, managerIndex) => (
              <li key={managerIndex}>
                <ManagerImage src={profile} />
              </li>
            ))}
          </ManagerList>
        </InformationSection>
        <InformationSection title="Variants" />
        <InformationSection title="Locales" />
        <InformationSection title="Used in" />
      </SectionList>
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
  transition: all 0.2s ease;
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

const SelectWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 28px;
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

const SectionList = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
`;

const IconImage = styled.img``;

const ManagerList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`;

const ManagerImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 11px;
`;
