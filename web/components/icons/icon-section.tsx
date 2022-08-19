import React from 'react';
import { styled } from '@linaria/react';

import IconGridItem, { IIconGridItem } from '../icon-item/icon-grid-item';

interface IIconSection {
  title: string;
  icons: IIconGridItem[];
}

const IconSection: React.FC<IIconSection> = ({ title, icons }) => {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <Grid>
        {icons.map(({ icon, name }) => (
          <IconGridItem key={name} icon={icon} name={name} />
        ))}
      </Grid>
    </Section>
  );
};

export default IconSection;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
`;

const SectionTitle = styled.h1`
  margin: 0;
  margin-bottom: 24px;
  font-weight: 900;
  font-size: 28px;
  line-height: 1.17;
  color: #000000;
`;

const Grid = styled.ul`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1.5rem;
`;
