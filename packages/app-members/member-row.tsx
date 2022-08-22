import React from "react";
import styled from "@emotion/styled";
import { MoreHoriz } from "@mui/icons-material";
export function MemberRow({
  avatar,
  name,
  email,
  role,
}: {
  avatar?: string;
  name: string;
  email: string;
  role: string;
}) {
  return (
    <RootWrapperMemberRow>
      <Layout>
        <AvatarContainer src={avatar} />
        <Container>
          <Name>{name}</Name>
          <Email>{email}</Email>
        </Container>
      </Layout>
      <Trailing>
        <Role>{role}</Role>
        <MoreHoriz />
      </Trailing>
    </RootWrapperMemberRow>
  );
}

const RootWrapperMemberRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const Layout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  align-self: stretch;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const AvatarContainer = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 12px;
  box-sizing: border-box;
`;

const Name = styled.span`
  color: black;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: Inter, sans-serif;
  font-weight: 600;
  text-align: left;
`;

const Email = styled.span`
  color: rgba(0, 0, 0, 0.6);
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: left;
`;

const Trailing = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  gap: 33px;
  align-self: stretch;
  box-sizing: border-box;
  flex-shrink: 0;
`;

const Role = styled.span`
  color: black;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: left;
`;
