import React from 'react';
import { styled } from 'linaria/react';

interface IInformationSection extends React.PropsWithChildren {
  title: string;
  icon?: React.ReactNode;
}

const InformationSection: React.FC<IInformationSection> = ({
  title,
  icon,
  children,
}) => {
  return (
    <Section>
      <Header>
        <Title>{title}</Title>
        {icon}
      </Header>
      {children}
    </Section>
  );
};

export default InformationSection;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 18px;
  padding-bottom: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  color: #000000;
`;
