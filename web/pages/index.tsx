import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { styled } from 'linaria/react';
import axios from 'axios';

import DashboardAppbar from '../components/appbar/dashboard.appbar';
import ProjectCard from '../components/home/project-card';
import Button from '../components/button';

import mockups from '../mockups/projects';

interface IProject {
  name: string;
  updatedAt: string;
  preview: string;
  href: string;
}

const Home = () => {
  const router = useRouter();
  const query = {
    src: router.query.src as string,
    // Queries could be added here
  };

  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const updateProjects = (projects: any) =>
      setProjects(
        projects.map(({ onclick, ...project }) => ({
          ...project,
          href: onclick,
        }))
      );

    const fetchData = async () => {
      if (!query.src) {
        updateProjects(mockups);
        return;
      }
      const { data } = await axios.get(query.src);
      updateProjects(data);
    };

    fetchData();
  }, [query.src]);

  return (
    <>
      <DashboardAppbar />
      <Wrapper>
        <BannerWrapper>
          <BannerContainer>
            <BrandImage src="/assets/images/grida.svg" />
            <CreateButton>+ Create New</CreateButton>
          </BannerContainer>
        </BannerWrapper>
        <ProjectList>
          {projects.map((project, projectIndex) => (
            <ProjectCard key={projectIndex} {...project} />
          ))}
        </ProjectList>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.main`
  flex: 1;
  padding-top: 55px;
  padding-bottom: 55px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BannerWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 32vh;
  display: flex;
`;

const BannerContainer = styled.div`
  width: 92%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandImage = styled.img`
  width: 123px;
  height: 93px;
`;

const CreateButton = styled(Button)`
  position: absolute;
  bottom: -26px;
  right: 0;
  background-color: #2562ff;
`;

const ProjectList = styled.ul`
  padding: 0;
  list-style-type: none;
  width: 92%;
  margin: 0 auto;
  flex: 1;
  padding-top: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(425px, 1fr));
  grid-column-gap: 1.5rem;
  grid-row-gap: 2.5rem;
`;
