import React from "react";
import { styled } from "linaria/react";

export function SettingsSectionHeader({
  header,
  description,
  chip,
}: {
  header: string;
  chip?: React.ReactNode;
  description?: string;
}) {
  return (
    <Wrapper>
      <HeaderContainer>
        <Header>{header}</Header>
        {chip}
      </HeaderContainer>
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 18px;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 10px;
  box-sizing: border-box;
`;

const Header = styled.span`
  color: black;
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  text-align: left;
`;

const Description = styled.span`
  color: rgba(0, 0, 0, 0.8);
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: left;
  align-self: stretch;
  flex-shrink: 0;
`;
