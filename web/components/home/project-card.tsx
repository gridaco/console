import React from 'react';
import Link from 'next/link';
import { styled } from 'linaria/react';

export interface IProjectCard {
  preview?: string;
  name: string;
  updatedAt?: string;
  href: string;
}

const ProjectCard: React.FC<IProjectCard> = ({
  name,
  preview,
  updatedAt,
  href,
}) => {
  return (
    <Link href={href}>
      <Container>
        <PreviewImage src={preview} />
        <Information>
          <Name>{name}</Name>
          <UpdatedAt>{updatedAt}</UpdatedAt>
        </Information>
      </Container>
    </Link>
  );
};

export default ProjectCard;

const Container = styled.li`
  min-width: 425px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 16px 2px rgba(157, 157, 157, 0.12);
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 272px;
  background-color: #f0f0f0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  user-select: none;
  -webkit-user-drag: none;
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: white;
  padding: 21px;
  min-height: 92px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Name = styled.h3`
  margin: 0;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  color: #000000;
`;

const UpdatedAt = styled.span`
  font-size: 14px;
  line-height: 1.2;
  color: #000000;
`;
