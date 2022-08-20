import React from "react";
import { styled } from "linaria/react";

export function OnboardingHeader({
  header,
  description,
}: {
  header: string;
  description?: string;
}) {
  return (
    <Wrap>
      <Header>{header}</Header>
      <Description>{description}</Description>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  box-sizing: border-box;
  padding: 0px 0px 16px;
  flex-shrink: 0;
`;

const Header = styled.span`
  color: black;
  text-overflow: ellipsis;
  font-size: 24px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: center;
  align-self: stretch;
  flex-shrink: 0;
`;

const Description = styled.span`
  color: rgba(0, 0, 0, 0.6);
  text-overflow: ellipsis;
  font-size: 12px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: center;
  align-self: stretch;
  flex-shrink: 0;
`;
